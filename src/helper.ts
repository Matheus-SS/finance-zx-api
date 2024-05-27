import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import jwt from 'jsonwebtoken'
import { randomUUID }  from 'node:crypto';

export class ServerResponse {
  private ok: boolean;
  private message: any;
  constructor(msg: any) {
    this.message = msg;
    this.ok = true
  }
}

export class ServerException extends HttpException {
  private msg: any;
  constructor(msg: any, status: number, stack?: any) {
    super(msg, status);
    this.msg = msg
    this.stack = stack
  }
}
 
export const http = {
  StatusUnprocessable: HttpStatus.UNPROCESSABLE_ENTITY,
  StatusInternalServer: HttpStatus.INTERNAL_SERVER_ERROR,
  StatusConflict: HttpStatus.CONFLICT,
  StatusCreated: HttpStatus.CREATED,
  StatusOk: HttpStatus.OK
}

export function IsNullUndefinedOrEmpty(value: any): boolean {
  if (value === "" || value === undefined || value === null) {
    return true
  }  
  return false
}

export function hasMaxLength(value: any, maxLength: number): boolean {
  if (value?.length > maxLength) {
    return true
  }
  return false
}

export function hasMinLength(value: any, minLength: number): boolean {
  if (value?.length < minLength) {
    return true
  }
  return false
}

export function generateToken(session_id: string, expiresIn: number): string {
  return jwt.sign({ session: session_id }, 'secret', { expiresIn: expiresIn });
}

export function getUnixTime(): number {
  return Math.floor(new Date().getTime()/1000.0)
}

export function uuid(): string {
  return randomUUID()
}

export function convertHourToMili(hours: number) {
  const MIN = 60 // sec
  const HOUR = MIN * 60 // 1 hora
  return (hours * HOUR) * 1000  
}

export function convertMiliToSec(mili: number) {
  return mili / 1000  
}