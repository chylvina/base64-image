'use strict';

exports.index = function (req, res) {
  res.redirect(301, 'index.html');
};

exports.upload = function (req, res) {
  var path = require('path'),
    fs = require('fs'),
    mime = require("mime"),
    _existsSync = fs.existsSync,
    formidable = require('formidable'),
    logger = require('../lib/logger'),
    util = require('util'),
    options = {
      tmpDir: './tmp',
      maxPostSize: 1000000, // 1 MB
      minFileSize: 1,
      maxFileSize: 1000000, // 1 MB
      acceptFileTypes: /\.(gif|jpe?g|png)$/i,
      // Files not matched by this regular expression force a download dialog,
      // to prevent executing any scripts in the context of the service domain:
      inlineFileTypes: /\.(gif|jpe?g|png)$/i,
      imageTypes: /\.(gif|jpe?g|png)$/i,
      accessControl: {
        allowOrigin: '*',
        allowMethods: 'GET, POST',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
      }
    },
    utf8encode = function (str) {
      return unescape(encodeURIComponent(str));
    },
    base64Image = function (src) {
      return fs.readFileSync(src).toString("base64");
    },
    onError = function (msg) {
      logger.error(msg);
      res.json(200, {
        success: 0,
        msg: msg
      });
    },
    onSuccess = function (data, fileType) {
      logger.data('123');
      /*res.setHeader(
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
      );*/
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Content-Disposition', 'inline; filename="files.json"');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');   // IE8 doesn't support application/json
      res.send(200, {
        success: 1,
        data: data,
        type: fileType
      });
    };

  var FileInfo = function (file) {
      this.file = file;
      this.name = file.name;
      this.size = file.size;
      this.type = file.type;
    };

  FileInfo.prototype.validate = function () {
    if (options.minFileSize && options.minFileSize > this.size) {
      // 'File is too small'
      return false;
    }
    else if (options.maxFileSize && options.maxFileSize < this.size) {
      // 'File is too big'
      return false;
    }
    /*else if (!options.acceptFileTypes.test(this.name)) {
      onError('Filetype not allowed', this.file);
    }*/

    return true;
  };
  FileInfo.prototype.safeName = function () {
    this.name = (new Date()).getTime() + '-' + Math.round(Math.random() * 1000);
  };

  var form = new formidable.IncomingForm(),
    tmpFiles = [],
    files = [],
    map = {};

  form.uploadDir = options.tmpDir;
  form.encoding = 'utf-8';
  form
    .on('fileBegin', function (name, file) {
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
      var fileInfo = map[path.basename(file.path)];
      fileInfo.size = file.size;

      if (!fileInfo.validate()) {
        return onError('');
      }

      try {
        var data = base64Image(file.path);
        if(data && data != '') {
          return onSuccess(data, fileInfo.type);
        }
      }
      catch(error) {
        return onError('');
      }
    })
    .on('aborted', function () {
      console.log('aborted');
    })
    .on('error', function (e) {
      onError(e);
    })
    .on('progress', function (bytesReceived, bytesExpected) {
      if (bytesReceived > options.maxPostSize) {
        req.connection.destroy();
      }
    })
    .on('end', function () {
      tmpFiles.forEach(function (file) {
        try {
          fs.unlink(file);
        }
        catch(e) {

        }
      });
    });
    form.parse(req);
};