import { ApiBody } from '@nestjs/swagger';
import * as multer from 'multer';
import { extname } from 'path';
import { ForbiddenException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|JPG|JPEG|png|PNG|gif|GIF)$/)) {
    return callback(
      new ForbiddenException({ message: 'Only image files are allowed!' }),
      false,
    );
  }
  callback(null, true);
};

export const mediaFileFilter = (req, file, callback) => {
  if (
    !(
      /\.(mp4|avi|mpeg|mp3|wav|flv|FLV|mkv|MKV|jpg|jpeg|JPG|JPEG|png|PNG|gif|GIF|pdf|PDF|doc|DOC|docx|DOCX|xlsx|xlsm|xlsb|xltx)$/
    ).test(file.originalname)
  ) {
    return callback(
      new ForbiddenException({ message: 'Only video image and doc files are allowed!' }),
      false,
    );
  }
  callback(null, true);
};

export const pdfDocXlFilter = (req, file, callback) => {
  if (
    !(
      /\.(jpg|jpeg|JPG|JPEG|png|PNG|gif|GIF|pdf|PDF|doc|DOC|docx|DOCX|xlsx|xlsm|xlsb|xltx)$/
    ).test(file.originalname)
  ) {
    return callback(
      new ForbiddenException({
        message: 'Only pdf, doc or xl files are allowed!',
      }),
      false,
    );
  }
  callback(null, true);
};

export const editedFileName = (req, file, callback) => {
  // let name = file.originalname.split('.')[0];
  // name = name.replace(/\s/g, '');
  const fileExtName = extname(file.originalname);
  const randomName = file.originalname + '-' + new Date().getTime();
  callback(null, `${randomName}${fileExtName}`);
};

export const originalFileName = (req, file, callback) => {
  const originalName = file.originalname;
  callback(null, `${originalName}`);
};

export const storage = multer.diskStorage({
  destination: './sys-files/',
  filename: editedFileName,
});

export const storageforRegistration = multer.diskStorage({
  destination: './sys-files/vehicle-registration',
  filename: editedFileName,
});

export const storageforRunnerRequired = multer.diskStorage({
  destination: './sys-files/runner-required',
  filename: originalFileName,
});

export const storageforCustomerInfo = multer.diskStorage({
  destination: './sys-files/runner-required',
  filename: editedFileName,
});

export const ApiFile =
  (fileName = 'image'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

export const ApiMultiFile =
  (fileName = 'image'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
