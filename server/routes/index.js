'use strict';

exports.index = function (req, res) {
  res.redirect(301, 'index.html');
};

exports.uploadOption = function(req, res) {
  console.log('options');
  var options = {
    accessControl: {
      allowOrigin: '*',
      allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
      allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    }
  };
  res.setHeader(
    'Access-Control-Allow-Origin',
    options.accessControl.allowOrigin
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    options.accessControl.allowMethods
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    options.accessControl.allowHeaders
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Disposition', 'inline; filename="files.json"');
  res.end();
}

exports.upload = function (req, res) {
  console.log(123);
  console.log(req);
  var path = require('path'),
    fs = require('fs'),
    mime = require("mime"),
    _existsSync = fs.existsSync,
    formidable = require('formidable'),
    options = {
      tmpDir: './tmp',
      maxPostSize: 11000000000, // 11 GB
      minFileSize: 1,
      maxFileSize: 10000000000, // 10 GB
      acceptFileTypes: /\.(gif|jpe?g|png)$/i,
      // Files not matched by this regular expression force a download dialog,
      // to prevent executing any scripts in the context of the service domain:
      inlineFileTypes: /\.(gif|jpe?g|png)$/i,
      imageTypes: /\.(gif|jpe?g|png)$/i,
      accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
      }
    },
    utf8encode = function (str) {
      return unescape(encodeURIComponent(str));
    },
    base64Image = function (src) {
      var data = fs.readFileSync(src).toString("base64");
      return util.format("data:%s;base64,%s", mime.lookup(src), data);
    },
    onError = function (msg, file) {
      fs.unlink(file.path);
    },
    onSuccess = function () {
      res.setHeader(
        'Access-Control-Allow-Origin',
        options.accessControl.allowOrigin
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        options.accessControl.allowMethods
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        options.accessControl.allowHeaders
      );
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Content-Disposition', 'inline; filename="files.json"');
    };

  var FileInfo = function (file) {
      this.file = file;
      this.name = file.name;
      this.size = file.size;
      this.type = file.type;
    };

  FileInfo.prototype.validate = function () {
    if (options.minFileSize && options.minFileSize > this.size) {
      onError('File is too small', this.file);
    }
    else if (options.maxFileSize && options.maxFileSize < this.size) {
      onError('File is too big', this.file);
    }
    else if (!options.acceptFileTypes.test(this.name)) {
      onError('Filetype not allowed', this.file);
    }
  };
  FileInfo.prototype.safeName = function () {
    this.name = (new Date()).getTime() + '-' + Math.round(Math.random() * 1000);
  };

  var form = new formidable.IncomingForm(),
    tmpFiles = [],
    files = [],
    map = {};
  console.log(options.tmpDir);
  form.uploadDir = options.tmpDir;
  //form.encoding = 'utf-8';
  form
    .on('fileBegin', function (name, file) {
      console.log('fileBegin');
      tmpFiles.push(file.path);
      var fileInfo = new FileInfo(file);
      fileInfo.safeName();
      map[path.basename(file.path)] = fileInfo;
      files.push(fileInfo);
    })
    .on('field', function (name, value) {
      console.log('field', name, value);
    })
    .on('file', function (name, file) {
      console.log('file');
      var fileInfo = map[path.basename(file.path)];
      fileInfo.size = file.size;
      if (!fileInfo.validate()) {
        return onError('', file);
      }
      console.log(base64Image(file.path));
    })
    .on('aborted', function () {
      console.log('aborted');
      tmpFiles.forEach(function (file) {
        return onError('', file);
      });
    })
    .on('error', function (e) {
      console.log('error', e);
      tmpFiles.forEach(function (file) {
        return onError('', file);
      });
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      console.log('progress', bytesReceived, bytesExpected);
      if (bytesReceived > options.maxPostSize) {
        req.connection.destroy();
      }
    })
    .on('end', function () {
      console.log('end');
    });
    form.parse(req);
};