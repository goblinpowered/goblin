/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "framesystem.auth";

export interface AuthorizeRequest {
  resource: string;
  profile: string;
  role: string;
  user: string;
  token: string;
}

export interface AuthorizeResponse {
  authorized: boolean;
}

const baseAuthorizeRequest: object = {
  resource: "",
  profile: "",
  role: "",
  user: "",
  token: "",
};

export const AuthorizeRequest = {
  encode(message: AuthorizeRequest, writer: Writer = Writer.create()): Writer {
    if (message.resource !== "") {
      writer.uint32(10).string(message.resource);
    }
    if (message.profile !== "") {
      writer.uint32(18).string(message.profile);
    }
    if (message.role !== "") {
      writer.uint32(26).string(message.role);
    }
    if (message.user !== "") {
      writer.uint32(34).string(message.user);
    }
    if (message.token !== "") {
      writer.uint32(42).string(message.token);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthorizeRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthorizeRequest } as AuthorizeRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.profile = reader.string();
          break;
        case 3:
          message.role = reader.string();
          break;
        case 4:
          message.user = reader.string();
          break;
        case 5:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthorizeRequest {
    const message = { ...baseAuthorizeRequest } as AuthorizeRequest;
    message.resource =
      object.resource !== undefined && object.resource !== null
        ? String(object.resource)
        : "";
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? String(object.profile)
        : "";
    message.role =
      object.role !== undefined && object.role !== null
        ? String(object.role)
        : "";
    message.user =
      object.user !== undefined && object.user !== null
        ? String(object.user)
        : "";
    message.token =
      object.token !== undefined && object.token !== null
        ? String(object.token)
        : "";
    return message;
  },

  toJSON(message: AuthorizeRequest): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.profile !== undefined && (obj.profile = message.profile);
    message.role !== undefined && (obj.role = message.role);
    message.user !== undefined && (obj.user = message.user);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthorizeRequest>, I>>(
    object: I
  ): AuthorizeRequest {
    const message = { ...baseAuthorizeRequest } as AuthorizeRequest;
    message.resource = object.resource ?? "";
    message.profile = object.profile ?? "";
    message.role = object.role ?? "";
    message.user = object.user ?? "";
    message.token = object.token ?? "";
    return message;
  },
};

const baseAuthorizeResponse: object = { authorized: false };

export const AuthorizeResponse = {
  encode(message: AuthorizeResponse, writer: Writer = Writer.create()): Writer {
    if (message.authorized === true) {
      writer.uint32(8).bool(message.authorized);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthorizeResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthorizeResponse } as AuthorizeResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorized = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthorizeResponse {
    const message = { ...baseAuthorizeResponse } as AuthorizeResponse;
    message.authorized =
      object.authorized !== undefined && object.authorized !== null
        ? Boolean(object.authorized)
        : false;
    return message;
  },

  toJSON(message: AuthorizeResponse): unknown {
    const obj: any = {};
    message.authorized !== undefined && (obj.authorized = message.authorized);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthorizeResponse>, I>>(
    object: I
  ): AuthorizeResponse {
    const message = { ...baseAuthorizeResponse } as AuthorizeResponse;
    message.authorized = object.authorized ?? false;
    return message;
  },
};

export interface FramesystemAuthService {
  Authorize(request: AuthorizeRequest): Promise<AuthorizeResponse>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
