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

/** Partido */
export type Match = {
  __typename?: 'Match';
  awayTeam: Scalars['String'];
  homeTeam: Scalars['String'];
  id: Scalars['ID'];
  officialScore?: Maybe<Score>;
  roomId: Scalars['ID'];
  startDate: Scalars['String'];
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
  redirectLink: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateRoom: Room;
  authenticateUser: User;
  authorizeMercadoPago?: Maybe<MercadoPagoAccessToken>;
  changePassword?: Maybe<Scalars['String']>;
  createMatch: Match;
  createRoom: Room;
  deleteMatch?: Maybe<Scalars['String']>;
  deleteRoom?: Maybe<Scalars['String']>;
  disconnectMercadoPagoIntegration?: Maybe<Scalars['String']>;
  generateMercadoPagoPreferenceId: MercadoPagoPreference;
  registerNewUser: User;
  sendResetPasswordEmail?: Maybe<Scalars['String']>;
  updateManyMatchScores: Array<Match>;
  updateMatch: Match;
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

export type MutationCreateMatchArgs = {
  awayTeam: Scalars['String'];
  date: Scalars['String'];
  homeTeam: Scalars['String'];
  roomId: Scalars['String'];
};

export type MutationCreateRoomArgs = {
  dueDate: Scalars['String'];
  entryPrice: Scalars['Float'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  prizeMoney: Scalars['Float'];
};

export type MutationDeleteMatchArgs = {
  matchId: Scalars['String'];
};

export type MutationDeleteRoomArgs = {
  roomId: Scalars['String'];
};

export type MutationGenerateMercadoPagoPreferenceIdArgs = {
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

export type MutationUpdateManyMatchScoresArgs = {
  scoreUpdates: Array<ScoreUpdateInput>;
};

export type MutationUpdateMatchArgs = {
  awayTeam: Scalars['String'];
  date: Scalars['String'];
  homeTeam: Scalars['String'];
  matchId: Scalars['String'];
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
  getActiveUnpaidRooms: Array<Room>;
  getMatchesByRoomId: Array<Match>;
  getMatchesByRoomIdForPlayers: Array<Match>;
  getRoomById: Room;
  getRoomsByUserId: Array<Room>;
  getUserMpAccessToken?: Maybe<Scalars['String']>;
  getUserPayedRooms: Array<Room>;
  validateToken: Scalars['Boolean'];
};

export type QueryGetMatchesByRoomIdArgs = {
  roomId: Scalars['String'];
};

export type QueryGetMatchesByRoomIdForPlayersArgs = {
  roomId: Scalars['String'];
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

export enum Score {
  Away = 'AWAY',
  Draw = 'DRAW',
  Home = 'HOME',
}

export type ScoreUpdateInput = {
  matchId: Scalars['ID'];
  score?: InputMaybe<Score>;
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
