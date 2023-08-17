export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Token de acceso a Mercado Pago */
export type MercadoPagoAccessToken = {
  __typename?: 'MercadoPagoAccessToken';
  accessToken: Scalars['String'];
};

/** Informacion de link de pago de MercadoPago */
export type MercadoPagoPreference = {
  __typename?: 'MercadoPagoPreference';
  preferenceId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateRoom: Room;
  authenticateUser: User;
  authorizeMercadoPago?: Maybe<MercadoPagoAccessToken>;
  changePassword?: Maybe<Scalars['String']>;
  createRoom: Room;
  deleteRoom?: Maybe<Scalars['String']>;
  disconnectMercadoPagoIntegration?: Maybe<Scalars['String']>;
  registerNewUser: User;
  sendResetPasswordEmail?: Maybe<Scalars['String']>;
  updateRoom?: Maybe<Room>;
};

export type MutationActivateRoomArgs = {
  roomId: Scalars['String'];
};

export type MutationAuthenticateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationAuthorizeMercadoPagoArgs = {
  mercadoPagoCode: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationCreateRoomArgs = {
  dueDate: Scalars['String'];
  entryPrice: Scalars['Float'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  prizeMoney: Scalars['Float'];
};

export type MutationDeleteRoomArgs = {
  roomId: Scalars['String'];
};

export type MutationRegisterNewUserArgs = {
  address: Scalars['String'];
  cellphone: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  termsAccepted: Scalars['Boolean'];
};

export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String'];
};

export type MutationUpdateRoomArgs = {
  dueDate: Scalars['String'];
  entryPrice: Scalars['Float'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  prizeMoney: Scalars['Float'];
  roomId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getRoomById: Room;
  getRoomsByUserId: Array<Room>;
  getUserMpAccessToken?: Maybe<Scalars['String']>;
  validateToken: Scalars['Boolean'];
};

export type QueryGetRoomByIdArgs = {
  roomId: Scalars['String'];
};

export type QueryValidateTokenArgs = {
  isResetPassword: Scalars['Boolean'];
  token: Scalars['String'];
};

/** Sala de prode */
export type Room = {
  __typename?: 'Room';
  dueDate: Scalars['String'];
  entryPrice: Scalars['Float'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  paymentLink: Scalars['String'];
  prizeMoney: Scalars['Float'];
};

/** App user */
export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  cellphone: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: UserRole;
  token: Scalars['String'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Player = 'PLAYER',
}
