import { NotAcceptableException } from '@nestjs/common';
import * as crypto from 'crypto';

export function encrypt(text, key) {
  key = crypto
    .createHash('sha256')
    .update(key)
    .digest('base64')
    .substr(0, 32);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encryptedText, key) {
  key = crypto
    .createHash('sha256')
    .update(key)
    .digest('base64')
    .substr(0, 32);
  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function validatePaginationParams(limit, page) {
  if (limit === undefined || page === undefined) {
    throw new NotAcceptableException(
      'Parameters for Pagination, limit and page, not passed',
    );
  }

  if (isNaN(limit) || isNaN(page)) {
    throw new NotAcceptableException('Limit and page must be valid numbers');
  }

  if (page < 1) {
    throw new NotAcceptableException('Page must be greater than one');
  }
}


export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
  }
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  let digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

export function randomCNPJ(): string {
  const random = (n: number) => Math.floor(Math.random() * n);
  
  const n = 9;
  const cnpj = Array.from({ length: 12 }, () => random(n)).join('');

  const calcDV = (cnpj: string) => {
      const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const sum = cnpj.split('').reduce((acc, digit, index) => acc + parseInt(digit) * weights[index + (weights.length - cnpj.length)], 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
  };

  const dv1 = calcDV(cnpj);
  const dv2 = calcDV(cnpj + dv1);

  return `${cnpj}${dv1}${dv2}`;
}

export function randomCPF(): string {
  const random = (n: number) => Math.floor(Math.random() * n);

  const cpf = Array.from({ length: 9 }, () => random(10)).join('');

  const calcDV = (cpf: string) => {
      const weights = cpf.length === 9 ? [10, 9, 8, 7, 6, 5, 4, 3, 2] : [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      const sum = cpf.split('').reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
  };

  const dv1 = calcDV(cpf);
  const dv2 = calcDV(cpf + dv1);

  return `${cpf}${dv1}${dv2}`;
}




