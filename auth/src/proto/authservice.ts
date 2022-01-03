/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'framesystem.auth';

export interface AuthorizeRequest {
  resource: string;
  actor: string;
  role: string;
}

export interface AuthorizeResponse {
  authorized: boolean;
}

export interface AuthenticateRequest {
  user: string;
  token: string;
}

export interface AuthenticateResponse {
  authenticated: boolean;
}

export interface CreateResourceRequest {
  type: string;
  id: string;
}

export interface CreateResourceResponse {
  id: string;
}

export interface AddMembershipRequest {
  parent: string;
  child: string;
}

export interface AddMembershipResponse {}

export interface RemoveMembershipRequest {
  parent: string;
  child: string;
}

export interface RemoveMembershipResponse {}

export interface GrantRoleRequest {
  resource: string;
  actor: string;
  role: string;
}

export interface GrantRoleResponse {}

export interface RevokeRoleRequest {
  resource: string;
  actor: string;
  role: string;
}

export interface RevokeRoleResponse {}

const baseAuthorizeRequest: object = { resource: '', actor: '', role: '' };

export const AuthorizeRequest = {
  encode(message: AuthorizeRequest, writer: Writer = Writer.create()): Writer {
    if (message.resource !== '') {
      writer.uint32(10).string(message.resource);
    }
    if (message.actor !== '') {
      writer.uint32(18).string(message.actor);
    }
    if (message.role !== '') {
      writer.uint32(26).string(message.role);
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
          message.actor = reader.string();
          break;
        case 3:
          message.role = reader.string();
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
        : '';
    message.actor =
      object.actor !== undefined && object.actor !== null
        ? String(object.actor)
        : '';
    message.role =
      object.role !== undefined && object.role !== null
        ? String(object.role)
        : '';
    return message;
  },

  toJSON(message: AuthorizeRequest): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.actor !== undefined && (obj.actor = message.actor);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthorizeRequest>, I>>(
    object: I,
  ): AuthorizeRequest {
    const message = { ...baseAuthorizeRequest } as AuthorizeRequest;
    message.resource = object.resource ?? '';
    message.actor = object.actor ?? '';
    message.role = object.role ?? '';
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
    object: I,
  ): AuthorizeResponse {
    const message = { ...baseAuthorizeResponse } as AuthorizeResponse;
    message.authorized = object.authorized ?? false;
    return message;
  },
};

const baseAuthenticateRequest: object = { user: '', token: '' };

export const AuthenticateRequest = {
  encode(
    message: AuthenticateRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.user !== '') {
      writer.uint32(10).string(message.user);
    }
    if (message.token !== '') {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthenticateRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthenticateRequest } as AuthenticateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateRequest {
    const message = { ...baseAuthenticateRequest } as AuthenticateRequest;
    message.user =
      object.user !== undefined && object.user !== null
        ? String(object.user)
        : '';
    message.token =
      object.token !== undefined && object.token !== null
        ? String(object.token)
        : '';
    return message;
  },

  toJSON(message: AuthenticateRequest): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticateRequest>, I>>(
    object: I,
  ): AuthenticateRequest {
    const message = { ...baseAuthenticateRequest } as AuthenticateRequest;
    message.user = object.user ?? '';
    message.token = object.token ?? '';
    return message;
  },
};

const baseAuthenticateResponse: object = { authenticated: false };

export const AuthenticateResponse = {
  encode(
    message: AuthenticateResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.authenticated === true) {
      writer.uint32(8).bool(message.authenticated);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthenticateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthenticateResponse } as AuthenticateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authenticated = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateResponse {
    const message = { ...baseAuthenticateResponse } as AuthenticateResponse;
    message.authenticated =
      object.authenticated !== undefined && object.authenticated !== null
        ? Boolean(object.authenticated)
        : false;
    return message;
  },

  toJSON(message: AuthenticateResponse): unknown {
    const obj: any = {};
    message.authenticated !== undefined &&
      (obj.authenticated = message.authenticated);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticateResponse>, I>>(
    object: I,
  ): AuthenticateResponse {
    const message = { ...baseAuthenticateResponse } as AuthenticateResponse;
    message.authenticated = object.authenticated ?? false;
    return message;
  },
};

const baseCreateResourceRequest: object = { type: '', id: '' };

export const CreateResourceRequest = {
  encode(
    message: CreateResourceRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.type !== '') {
      writer.uint32(10).string(message.type);
    }
    if (message.id !== '') {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateResourceRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateResourceRequest } as CreateResourceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateResourceRequest {
    const message = { ...baseCreateResourceRequest } as CreateResourceRequest;
    message.type =
      object.type !== undefined && object.type !== null
        ? String(object.type)
        : '';
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
  },

  toJSON(message: CreateResourceRequest): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateResourceRequest>, I>>(
    object: I,
  ): CreateResourceRequest {
    const message = { ...baseCreateResourceRequest } as CreateResourceRequest;
    message.type = object.type ?? '';
    message.id = object.id ?? '';
    return message;
  },
};

const baseCreateResourceResponse: object = { id: '' };

export const CreateResourceResponse = {
  encode(
    message: CreateResourceResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateResourceResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCreateResourceResponse } as CreateResourceResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateResourceResponse {
    const message = { ...baseCreateResourceResponse } as CreateResourceResponse;
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
  },

  toJSON(message: CreateResourceResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateResourceResponse>, I>>(
    object: I,
  ): CreateResourceResponse {
    const message = { ...baseCreateResourceResponse } as CreateResourceResponse;
    message.id = object.id ?? '';
    return message;
  },
};

const baseAddMembershipRequest: object = { parent: '', child: '' };

export const AddMembershipRequest = {
  encode(
    message: AddMembershipRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.parent !== '') {
      writer.uint32(10).string(message.parent);
    }
    if (message.child !== '') {
      writer.uint32(18).string(message.child);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddMembershipRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddMembershipRequest } as AddMembershipRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.parent = reader.string();
          break;
        case 2:
          message.child = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddMembershipRequest {
    const message = { ...baseAddMembershipRequest } as AddMembershipRequest;
    message.parent =
      object.parent !== undefined && object.parent !== null
        ? String(object.parent)
        : '';
    message.child =
      object.child !== undefined && object.child !== null
        ? String(object.child)
        : '';
    return message;
  },

  toJSON(message: AddMembershipRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    message.child !== undefined && (obj.child = message.child);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddMembershipRequest>, I>>(
    object: I,
  ): AddMembershipRequest {
    const message = { ...baseAddMembershipRequest } as AddMembershipRequest;
    message.parent = object.parent ?? '';
    message.child = object.child ?? '';
    return message;
  },
};

const baseAddMembershipResponse: object = {};

export const AddMembershipResponse = {
  encode(_: AddMembershipResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddMembershipResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAddMembershipResponse } as AddMembershipResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): AddMembershipResponse {
    const message = { ...baseAddMembershipResponse } as AddMembershipResponse;
    return message;
  },

  toJSON(_: AddMembershipResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddMembershipResponse>, I>>(
    _: I,
  ): AddMembershipResponse {
    const message = { ...baseAddMembershipResponse } as AddMembershipResponse;
    return message;
  },
};

const baseRemoveMembershipRequest: object = { parent: '', child: '' };

export const RemoveMembershipRequest = {
  encode(
    message: RemoveMembershipRequest,
    writer: Writer = Writer.create(),
  ): Writer {
    if (message.parent !== '') {
      writer.uint32(10).string(message.parent);
    }
    if (message.child !== '') {
      writer.uint32(18).string(message.child);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RemoveMembershipRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRemoveMembershipRequest,
    } as RemoveMembershipRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.parent = reader.string();
          break;
        case 2:
          message.child = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveMembershipRequest {
    const message = {
      ...baseRemoveMembershipRequest,
    } as RemoveMembershipRequest;
    message.parent =
      object.parent !== undefined && object.parent !== null
        ? String(object.parent)
        : '';
    message.child =
      object.child !== undefined && object.child !== null
        ? String(object.child)
        : '';
    return message;
  },

  toJSON(message: RemoveMembershipRequest): unknown {
    const obj: any = {};
    message.parent !== undefined && (obj.parent = message.parent);
    message.child !== undefined && (obj.child = message.child);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveMembershipRequest>, I>>(
    object: I,
  ): RemoveMembershipRequest {
    const message = {
      ...baseRemoveMembershipRequest,
    } as RemoveMembershipRequest;
    message.parent = object.parent ?? '';
    message.child = object.child ?? '';
    return message;
  },
};

const baseRemoveMembershipResponse: object = {};

export const RemoveMembershipResponse = {
  encode(
    _: RemoveMembershipResponse,
    writer: Writer = Writer.create(),
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number,
  ): RemoveMembershipResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRemoveMembershipResponse,
    } as RemoveMembershipResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RemoveMembershipResponse {
    const message = {
      ...baseRemoveMembershipResponse,
    } as RemoveMembershipResponse;
    return message;
  },

  toJSON(_: RemoveMembershipResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveMembershipResponse>, I>>(
    _: I,
  ): RemoveMembershipResponse {
    const message = {
      ...baseRemoveMembershipResponse,
    } as RemoveMembershipResponse;
    return message;
  },
};

const baseGrantRoleRequest: object = { resource: '', actor: '', role: '' };

export const GrantRoleRequest = {
  encode(message: GrantRoleRequest, writer: Writer = Writer.create()): Writer {
    if (message.resource !== '') {
      writer.uint32(10).string(message.resource);
    }
    if (message.actor !== '') {
      writer.uint32(18).string(message.actor);
    }
    if (message.role !== '') {
      writer.uint32(26).string(message.role);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GrantRoleRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGrantRoleRequest } as GrantRoleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.actor = reader.string();
          break;
        case 3:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrantRoleRequest {
    const message = { ...baseGrantRoleRequest } as GrantRoleRequest;
    message.resource =
      object.resource !== undefined && object.resource !== null
        ? String(object.resource)
        : '';
    message.actor =
      object.actor !== undefined && object.actor !== null
        ? String(object.actor)
        : '';
    message.role =
      object.role !== undefined && object.role !== null
        ? String(object.role)
        : '';
    return message;
  },

  toJSON(message: GrantRoleRequest): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.actor !== undefined && (obj.actor = message.actor);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GrantRoleRequest>, I>>(
    object: I,
  ): GrantRoleRequest {
    const message = { ...baseGrantRoleRequest } as GrantRoleRequest;
    message.resource = object.resource ?? '';
    message.actor = object.actor ?? '';
    message.role = object.role ?? '';
    return message;
  },
};

const baseGrantRoleResponse: object = {};

export const GrantRoleResponse = {
  encode(_: GrantRoleResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GrantRoleResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGrantRoleResponse } as GrantRoleResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GrantRoleResponse {
    const message = { ...baseGrantRoleResponse } as GrantRoleResponse;
    return message;
  },

  toJSON(_: GrantRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GrantRoleResponse>, I>>(
    _: I,
  ): GrantRoleResponse {
    const message = { ...baseGrantRoleResponse } as GrantRoleResponse;
    return message;
  },
};

const baseRevokeRoleRequest: object = { resource: '', actor: '', role: '' };

export const RevokeRoleRequest = {
  encode(message: RevokeRoleRequest, writer: Writer = Writer.create()): Writer {
    if (message.resource !== '') {
      writer.uint32(10).string(message.resource);
    }
    if (message.actor !== '') {
      writer.uint32(18).string(message.actor);
    }
    if (message.role !== '') {
      writer.uint32(26).string(message.role);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RevokeRoleRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRevokeRoleRequest } as RevokeRoleRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resource = reader.string();
          break;
        case 2:
          message.actor = reader.string();
          break;
        case 3:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RevokeRoleRequest {
    const message = { ...baseRevokeRoleRequest } as RevokeRoleRequest;
    message.resource =
      object.resource !== undefined && object.resource !== null
        ? String(object.resource)
        : '';
    message.actor =
      object.actor !== undefined && object.actor !== null
        ? String(object.actor)
        : '';
    message.role =
      object.role !== undefined && object.role !== null
        ? String(object.role)
        : '';
    return message;
  },

  toJSON(message: RevokeRoleRequest): unknown {
    const obj: any = {};
    message.resource !== undefined && (obj.resource = message.resource);
    message.actor !== undefined && (obj.actor = message.actor);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RevokeRoleRequest>, I>>(
    object: I,
  ): RevokeRoleRequest {
    const message = { ...baseRevokeRoleRequest } as RevokeRoleRequest;
    message.resource = object.resource ?? '';
    message.actor = object.actor ?? '';
    message.role = object.role ?? '';
    return message;
  },
};

const baseRevokeRoleResponse: object = {};

export const RevokeRoleResponse = {
  encode(_: RevokeRoleResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RevokeRoleResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRevokeRoleResponse } as RevokeRoleResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RevokeRoleResponse {
    const message = { ...baseRevokeRoleResponse } as RevokeRoleResponse;
    return message;
  },

  toJSON(_: RevokeRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RevokeRoleResponse>, I>>(
    _: I,
  ): RevokeRoleResponse {
    const message = { ...baseRevokeRoleResponse } as RevokeRoleResponse;
    return message;
  },
};

export interface FramesystemAuthService {
  Authorize(request: AuthorizeRequest): Promise<AuthorizeResponse>;
  Authenticate(request: AuthenticateRequest): Promise<AuthenticateResponse>;
  CreateResource(
    request: CreateResourceRequest,
  ): Promise<CreateResourceResponse>;
  AddMembership(request: AddMembershipRequest): Promise<AddMembershipResponse>;
  RemoveMembership(
    request: RemoveMembershipRequest,
  ): Promise<RemoveMembershipResponse>;
  GrantRole(request: GrantRoleRequest): Promise<GrantRoleResponse>;
  RevokeRole(request: RevokeRoleRequest): Promise<RevokeRoleResponse>;
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
