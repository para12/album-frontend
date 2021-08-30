import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type AddPhoto = {
  __typename?: 'AddPhoto';
  photo?: Maybe<PhotoType>;
};

export type AlbumType = {
  __typename?: 'AlbumType';
  id: Scalars['UUID'];
  name: Scalars['String'];
  owner: UserType;
  createdAt: Scalars['DateTime'];
  photoSet: Array<PhotoType>;
};

/**
 * Archive account and revoke refresh tokens.
 *
 * User must be verified and confirm password.
 */
export type ArchiveAccount = {
  __typename?: 'ArchiveAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type CreateAlbum = {
  __typename?: 'CreateAlbum';
  album?: Maybe<AlbumType>;
};



/**
 * Delete account permanently or make `user.is_active=False`.
 *
 * The behavior is defined on settings.
 * Anyway user refresh tokens are revoked.
 *
 * User must be verified and confirm password.
 */
export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type DeleteAlbum = {
  __typename?: 'DeleteAlbum';
  album?: Maybe<AlbumType>;
};

export type DeletePhoto = {
  __typename?: 'DeletePhoto';
  photo?: Maybe<PhotoType>;
};



export type ModifyAlbum = {
  __typename?: 'ModifyAlbum';
  album?: Maybe<AlbumType>;
};

export type ModifyPhoto = {
  __typename?: 'ModifyPhoto';
  photo?: Maybe<PhotoType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPhoto?: Maybe<AddPhoto>;
  deletePhoto?: Maybe<DeletePhoto>;
  modifyPhoto?: Maybe<ModifyPhoto>;
  createAlbum?: Maybe<CreateAlbum>;
  deleteAlbum?: Maybe<DeleteAlbum>;
  modifyAlbum?: Maybe<ModifyAlbum>;
  /**
   * Register user with fields defined in the settings.
   *
   * If the email field of the user model is part of the
   * registration fields (default), check if there is
   * no user with that email or as a secondary email.
   *
   * If it exists, it does not register the user,
   * even if the email field is not defined as unique
   * (default of the default django user model).
   *
   * When creating the user, it also creates a `UserStatus`
   * related to that user, making it possible to track
   * if the user is archived, verified and has a secondary
   * email.
   *
   * Send account verification email.
   *
   * If allowed to not verified users login, return token.
   */
  register?: Maybe<Register>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
  /**
   * Sends activation email.
   *
   * It is called resend because theoretically
   * the first activation email was sent when
   * the user registered.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  /**
   * Send password reset email.
   *
   * For non verified users, send an activation
   * email instead.
   *
   * Accepts both primary and secondary email.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  /**
   * Change user password without old password.
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, update
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordReset?: Maybe<PasswordReset>;
  /**
   * Change account password when user knows the old password.
   *
   * A new token and refresh token are sent. User must be verified.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Archive account and revoke refresh tokens.
   *
   * User must be verified and confirm password.
   */
  archiveAccount?: Maybe<ArchiveAccount>;
  /**
   * Delete account permanently or make `user.is_active=False`.
   *
   * The behavior is defined on settings.
   * Anyway user refresh tokens are revoked.
   *
   * User must be verified and confirm password.
   */
  deleteAccount?: Maybe<DeleteAccount>;
  /**
   * Update user model fields, defined on settings.
   *
   * User must be verified.
   */
  updateAccount?: Maybe<UpdateAccount>;
  /**
   * Send activation to secondary email.
   *
   * User must be verified and confirm password.
   */
  sendSecondaryEmailActivation?: Maybe<SendSecondaryEmailActivation>;
  /**
   * Verify user secondary email.
   *
   * Receive the token that was sent by email.
   * User is already verified when using this mutation.
   *
   * If the token is valid, add the secondary email
   * to `user.status.secondary_email` field.
   *
   * Note that until the secondary email is verified,
   * it has not been saved anywhere beyond the token,
   * so it can still be used to create a new account.
   * After being verified, it will no longer be available.
   */
  verifySecondaryEmail?: Maybe<VerifySecondaryEmail>;
  /**
   * Swap between primary and secondary emails.
   *
   * Require password confirmation.
   */
  swapEmails?: Maybe<SwapEmails>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  verifyToken?: Maybe<VerifyToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
};


export type MutationAddPhotoArgs = {
  albumId?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Date']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


export type MutationDeletePhotoArgs = {
  id?: Maybe<Scalars['String']>;
};


export type MutationModifyPhotoArgs = {
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Date']>;
};


export type MutationCreateAlbumArgs = {
  name?: Maybe<Scalars['String']>;
};


export type MutationDeleteAlbumArgs = {
  id?: Maybe<Scalars['String']>;
};


export type MutationModifyAlbumArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationResendActivationEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  token: Scalars['String'];
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  oldPassword: Scalars['String'];
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
};


export type MutationArchiveAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type MutationSendSecondaryEmailActivationArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifySecondaryEmailArgs = {
  token: Scalars['String'];
};


export type MutationSwapEmailsArgs = {
  password: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  token?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  user?: Maybe<UserNode>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  refreshToken?: Maybe<Scalars['String']>;
};

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Change user password without old password.
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, update
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordReset = {
  __typename?: 'PasswordReset';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type PhotoType = {
  __typename?: 'PhotoType';
  id: Scalars['UUID'];
  url: Scalars['String'];
  text: Scalars['String'];
  location: Scalars['String'];
  time?: Maybe<Scalars['Date']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  owner: UserType;
  album?: Maybe<AlbumType>;
};

export type Query = {
  __typename?: 'Query';
  albumPhotos?: Maybe<Array<Maybe<PhotoType>>>;
  allPhotos?: Maybe<Array<Maybe<PhotoType>>>;
  oneAlbum?: Maybe<AlbumType>;
  userAlbums?: Maybe<Array<Maybe<AlbumType>>>;
  allAlbums?: Maybe<Array<Maybe<AlbumType>>>;
  presignedUrl?: Maybe<Scalars['String']>;
  userByName?: Maybe<UserType>;
  me?: Maybe<UserType>;
  allUsers?: Maybe<Array<Maybe<UserType>>>;
};


export type QueryAlbumPhotosArgs = {
  albumId?: Maybe<Scalars['String']>;
};


export type QueryOneAlbumArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryUserAlbumsArgs = {
  username?: Maybe<Scalars['String']>;
};


export type QueryPresignedUrlArgs = {
  filename?: Maybe<Scalars['String']>;
};


export type QueryUserByNameArgs = {
  username?: Maybe<Scalars['String']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  token?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
};

/**
 * Register user with fields defined in the settings.
 *
 * If the email field of the user model is part of the
 * registration fields (default), check if there is
 * no user with that email or as a secondary email.
 *
 * If it exists, it does not register the user,
 * even if the email field is not defined as unique
 * (default of the default django user model).
 *
 * When creating the user, it also creates a `UserStatus`
 * related to that user, making it possible to track
 * if the user is archived, verified and has a secondary
 * email.
 *
 * Send account verification email.
 *
 * If allowed to not verified users login, return token.
 */
export type Register = {
  __typename?: 'Register';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Sends activation email.
 *
 * It is called resend because theoretically
 * the first activation email was sent when
 * the user registered.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type ResendActivationEmail = {
  __typename?: 'ResendActivationEmail';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RevokeToken = {
  __typename?: 'RevokeToken';
  revoked?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Send password reset email.
 *
 * For non verified users, send an activation
 * email instead.
 *
 * Accepts both primary and secondary email.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Send activation to secondary email.
 *
 * User must be verified and confirm password.
 */
export type SendSecondaryEmailActivation = {
  __typename?: 'SendSecondaryEmailActivation';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Swap between primary and secondary emails.
 *
 * Require password confirmation.
 */
export type SwapEmails = {
  __typename?: 'SwapEmails';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};


/**
 * Update user model fields, defined on settings.
 *
 * User must be verified.
 */
export type UpdateAccount = {
  __typename?: 'UpdateAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  albumSet: Array<AlbumType>;
  photoSet: Array<PhotoType>;
  pk?: Maybe<Scalars['Int']>;
  archived?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  secondaryEmail?: Maybe<Scalars['String']>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  albumSet: Array<AlbumType>;
  photoSet: Array<PhotoType>;
  password: Scalars['String'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/**
 * Verify user secondary email.
 *
 * Receive the token that was sent by email.
 * User is already verified when using this mutation.
 *
 * If the token is valid, add the secondary email
 * to `user.status.secondary_email` field.
 *
 * Note that until the secondary email is verified,
 * it has not been saved anywhere beyond the token,
 * so it can still be used to create a new account.
 * After being verified, it will no longer be available.
 */
export type VerifySecondaryEmail = {
  __typename?: 'VerifySecondaryEmail';
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
};

export type AddPhotoMutationVariables = Exact<{
  url: Scalars['String'];
  location: Scalars['String'];
  text: Scalars['String'];
  time?: Maybe<Scalars['Date']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  albumId: Scalars['String'];
}>;


export type AddPhotoMutation = { __typename?: 'Mutation', addPhoto?: Maybe<{ __typename?: 'AddPhoto', photo?: Maybe<{ __typename?: 'PhotoType', id: any, url: string, text: string, location: string, time?: Maybe<any>, createdAt: any, width?: Maybe<number>, height?: Maybe<number> }> }> };

export type CreateAlbumMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateAlbumMutation = { __typename?: 'Mutation', createAlbum?: Maybe<{ __typename?: 'CreateAlbum', album?: Maybe<{ __typename?: 'AlbumType', id: any, name: string, createdAt: any, owner: { __typename?: 'UserType', username: string } }> }> };

export type DeleteAlbumMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAlbumMutation = { __typename?: 'Mutation', deleteAlbum?: Maybe<{ __typename?: 'DeleteAlbum', album?: Maybe<{ __typename?: 'AlbumType', id: any, name: string, createdAt: any, owner: { __typename?: 'UserType', username: string } }> }> };

export type DeletePhotoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePhotoMutation = { __typename?: 'Mutation', deletePhoto?: Maybe<{ __typename?: 'DeletePhoto', photo?: Maybe<{ __typename?: 'PhotoType', id: any, createdAt: any, owner: { __typename?: 'UserType', username: string } }> }> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth?: Maybe<{ __typename?: 'ObtainJSONWebToken', success?: Maybe<boolean>, errors?: Maybe<any>, token?: Maybe<string>, refreshToken?: Maybe<string> }> };

export type ModifyAlbumMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type ModifyAlbumMutation = { __typename?: 'Mutation', modifyAlbum?: Maybe<{ __typename?: 'ModifyAlbum', album?: Maybe<{ __typename?: 'AlbumType', id: any, name: string, createdAt: any, owner: { __typename?: 'UserType', username: string } }> }> };

export type ModifyPhotoMutationVariables = Exact<{
  id: Scalars['String'];
  location: Scalars['String'];
  text: Scalars['String'];
  time?: Maybe<Scalars['Date']>;
}>;


export type ModifyPhotoMutation = { __typename?: 'Mutation', modifyPhoto?: Maybe<{ __typename?: 'ModifyPhoto', photo?: Maybe<{ __typename?: 'PhotoType', id: any, location: string, text: string }> }> };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'Register', success?: Maybe<boolean>, errors?: Maybe<any> }> };

export type VerifyAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount?: Maybe<{ __typename?: 'VerifyAccount', success?: Maybe<boolean>, errors?: Maybe<any> }> };

export type GetAlbumPhotosQueryVariables = Exact<{
  albumId: Scalars['String'];
}>;


export type GetAlbumPhotosQuery = { __typename?: 'Query', albumPhotos?: Maybe<Array<Maybe<{ __typename?: 'PhotoType', id: any, url: string, text: string, location: string, time?: Maybe<any>, createdAt: any, owner: { __typename?: 'UserType', username: string }, album?: Maybe<{ __typename?: 'AlbumType', id: any, name: string, owner: { __typename?: 'UserType', username: string } }> }>>> };

export type GetAllAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAlbumsQuery = { __typename?: 'Query', allAlbums?: Maybe<Array<Maybe<{ __typename?: 'AlbumType', id: any, name: string, createdAt: any }>>> };

export type GetOneAlbumQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetOneAlbumQuery = { __typename?: 'Query', oneAlbum?: Maybe<{ __typename?: 'AlbumType', id: any, name: string, createdAt: any, owner: { __typename?: 'UserType', username: string }, photoSet: Array<{ __typename?: 'PhotoType', id: any, url: string, text: string, location: string, time?: Maybe<any>, createdAt: any, width?: Maybe<number>, height?: Maybe<number>, owner: { __typename?: 'UserType', username: string } }> }> };

export type GetPresignedUrlQueryVariables = Exact<{
  filename: Scalars['String'];
}>;


export type GetPresignedUrlQuery = { __typename?: 'Query', presignedUrl?: Maybe<string> };

export type GetUserAlbumsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserAlbumsQuery = { __typename?: 'Query', userAlbums?: Maybe<Array<Maybe<{ __typename?: 'AlbumType', id: any, name: string, createdAt: any, owner: { __typename?: 'UserType', username: string } }>>> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'UserType', username: string, lastLogin?: Maybe<any>, email: string }> };


export const AddPhotoDocument = gql`
    mutation AddPhoto($url: String!, $location: String!, $text: String!, $time: Date, $width: Int, $height: Int, $albumId: String!) {
  addPhoto(
    url: $url
    location: $location
    text: $text
    time: $time
    width: $width
    height: $height
    albumId: $albumId
  ) {
    photo {
      id
      url
      text
      location
      time
      createdAt
      width
      height
    }
  }
}
    `;
export type AddPhotoMutationFn = Apollo.MutationFunction<AddPhotoMutation, AddPhotoMutationVariables>;

/**
 * __useAddPhotoMutation__
 *
 * To run a mutation, you first call `useAddPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPhotoMutation, { data, loading, error }] = useAddPhotoMutation({
 *   variables: {
 *      url: // value for 'url'
 *      location: // value for 'location'
 *      text: // value for 'text'
 *      time: // value for 'time'
 *      width: // value for 'width'
 *      height: // value for 'height'
 *      albumId: // value for 'albumId'
 *   },
 * });
 */
export function useAddPhotoMutation(baseOptions?: Apollo.MutationHookOptions<AddPhotoMutation, AddPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPhotoMutation, AddPhotoMutationVariables>(AddPhotoDocument, options);
      }
export type AddPhotoMutationHookResult = ReturnType<typeof useAddPhotoMutation>;
export type AddPhotoMutationResult = Apollo.MutationResult<AddPhotoMutation>;
export type AddPhotoMutationOptions = Apollo.BaseMutationOptions<AddPhotoMutation, AddPhotoMutationVariables>;
export const CreateAlbumDocument = gql`
    mutation CreateAlbum($name: String!) {
  createAlbum(name: $name) {
    album {
      id
      name
      createdAt
      owner {
        username
      }
    }
  }
}
    `;
export type CreateAlbumMutationFn = Apollo.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateAlbumMutation(baseOptions?: Apollo.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, options);
      }
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const DeleteAlbumDocument = gql`
    mutation DeleteAlbum($id: String!) {
  deleteAlbum(id: $id) {
    album {
      id
      name
      createdAt
      owner {
        username
      }
    }
  }
}
    `;
export type DeleteAlbumMutationFn = Apollo.MutationFunction<DeleteAlbumMutation, DeleteAlbumMutationVariables>;

/**
 * __useDeleteAlbumMutation__
 *
 * To run a mutation, you first call `useDeleteAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAlbumMutation, { data, loading, error }] = useDeleteAlbumMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAlbumMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAlbumMutation, DeleteAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAlbumMutation, DeleteAlbumMutationVariables>(DeleteAlbumDocument, options);
      }
export type DeleteAlbumMutationHookResult = ReturnType<typeof useDeleteAlbumMutation>;
export type DeleteAlbumMutationResult = Apollo.MutationResult<DeleteAlbumMutation>;
export type DeleteAlbumMutationOptions = Apollo.BaseMutationOptions<DeleteAlbumMutation, DeleteAlbumMutationVariables>;
export const DeletePhotoDocument = gql`
    mutation DeletePhoto($id: String!) {
  deletePhoto(id: $id) {
    photo {
      id
      createdAt
      owner {
        username
      }
    }
  }
}
    `;
export type DeletePhotoMutationFn = Apollo.MutationFunction<DeletePhotoMutation, DeletePhotoMutationVariables>;

/**
 * __useDeletePhotoMutation__
 *
 * To run a mutation, you first call `useDeletePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePhotoMutation, { data, loading, error }] = useDeletePhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeletePhotoMutation, DeletePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePhotoMutation, DeletePhotoMutationVariables>(DeletePhotoDocument, options);
      }
export type DeletePhotoMutationHookResult = ReturnType<typeof useDeletePhotoMutation>;
export type DeletePhotoMutationResult = Apollo.MutationResult<DeletePhotoMutation>;
export type DeletePhotoMutationOptions = Apollo.BaseMutationOptions<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    success
    errors
    token
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ModifyAlbumDocument = gql`
    mutation ModifyAlbum($id: String!, $name: String!) {
  modifyAlbum(id: $id, name: $name) {
    album {
      id
      name
      createdAt
      owner {
        username
      }
    }
  }
}
    `;
export type ModifyAlbumMutationFn = Apollo.MutationFunction<ModifyAlbumMutation, ModifyAlbumMutationVariables>;

/**
 * __useModifyAlbumMutation__
 *
 * To run a mutation, you first call `useModifyAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyAlbumMutation, { data, loading, error }] = useModifyAlbumMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useModifyAlbumMutation(baseOptions?: Apollo.MutationHookOptions<ModifyAlbumMutation, ModifyAlbumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyAlbumMutation, ModifyAlbumMutationVariables>(ModifyAlbumDocument, options);
      }
export type ModifyAlbumMutationHookResult = ReturnType<typeof useModifyAlbumMutation>;
export type ModifyAlbumMutationResult = Apollo.MutationResult<ModifyAlbumMutation>;
export type ModifyAlbumMutationOptions = Apollo.BaseMutationOptions<ModifyAlbumMutation, ModifyAlbumMutationVariables>;
export const ModifyPhotoDocument = gql`
    mutation ModifyPhoto($id: String!, $location: String!, $text: String!, $time: Date) {
  modifyPhoto(id: $id, location: $location, text: $text, time: $time) {
    photo {
      id
      location
      text
    }
  }
}
    `;
export type ModifyPhotoMutationFn = Apollo.MutationFunction<ModifyPhotoMutation, ModifyPhotoMutationVariables>;

/**
 * __useModifyPhotoMutation__
 *
 * To run a mutation, you first call `useModifyPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyPhotoMutation, { data, loading, error }] = useModifyPhotoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      location: // value for 'location'
 *      text: // value for 'text'
 *      time: // value for 'time'
 *   },
 * });
 */
export function useModifyPhotoMutation(baseOptions?: Apollo.MutationHookOptions<ModifyPhotoMutation, ModifyPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyPhotoMutation, ModifyPhotoMutationVariables>(ModifyPhotoDocument, options);
      }
export type ModifyPhotoMutationHookResult = ReturnType<typeof useModifyPhotoMutation>;
export type ModifyPhotoMutationResult = Apollo.MutationResult<ModifyPhotoMutation>;
export type ModifyPhotoMutationOptions = Apollo.BaseMutationOptions<ModifyPhotoMutation, ModifyPhotoMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password1: String!, $password2: String!) {
  register(
    username: $username
    email: $email
    password1: $password1
    password2: $password2
  ) {
    success
    errors
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password1: // value for 'password1'
 *      password2: // value for 'password2'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($token: String!) {
  verifyAccount(token: $token) {
    success
    errors
  }
}
    `;
export type VerifyAccountMutationFn = Apollo.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = Apollo.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = Apollo.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const GetAlbumPhotosDocument = gql`
    query GetAlbumPhotos($albumId: String!) {
  albumPhotos(albumId: $albumId) {
    id
    url
    text
    location
    time
    createdAt
    owner {
      username
    }
    album {
      id
      name
      owner {
        username
      }
    }
  }
}
    `;

/**
 * __useGetAlbumPhotosQuery__
 *
 * To run a query within a React component, call `useGetAlbumPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumPhotosQuery({
 *   variables: {
 *      albumId: // value for 'albumId'
 *   },
 * });
 */
export function useGetAlbumPhotosQuery(baseOptions: Apollo.QueryHookOptions<GetAlbumPhotosQuery, GetAlbumPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAlbumPhotosQuery, GetAlbumPhotosQueryVariables>(GetAlbumPhotosDocument, options);
      }
export function useGetAlbumPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumPhotosQuery, GetAlbumPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAlbumPhotosQuery, GetAlbumPhotosQueryVariables>(GetAlbumPhotosDocument, options);
        }
export type GetAlbumPhotosQueryHookResult = ReturnType<typeof useGetAlbumPhotosQuery>;
export type GetAlbumPhotosLazyQueryHookResult = ReturnType<typeof useGetAlbumPhotosLazyQuery>;
export type GetAlbumPhotosQueryResult = Apollo.QueryResult<GetAlbumPhotosQuery, GetAlbumPhotosQueryVariables>;
export const GetAllAlbumsDocument = gql`
    query GetAllAlbums {
  allAlbums {
    id
    name
    createdAt
  }
}
    `;

/**
 * __useGetAllAlbumsQuery__
 *
 * To run a query within a React component, call `useGetAllAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAlbumsQuery, GetAllAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAlbumsQuery, GetAllAlbumsQueryVariables>(GetAllAlbumsDocument, options);
      }
export function useGetAllAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAlbumsQuery, GetAllAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAlbumsQuery, GetAllAlbumsQueryVariables>(GetAllAlbumsDocument, options);
        }
export type GetAllAlbumsQueryHookResult = ReturnType<typeof useGetAllAlbumsQuery>;
export type GetAllAlbumsLazyQueryHookResult = ReturnType<typeof useGetAllAlbumsLazyQuery>;
export type GetAllAlbumsQueryResult = Apollo.QueryResult<GetAllAlbumsQuery, GetAllAlbumsQueryVariables>;
export const GetOneAlbumDocument = gql`
    query GetOneAlbum($id: String!) {
  oneAlbum(id: $id) {
    id
    name
    createdAt
    owner {
      username
    }
    photoSet {
      id
      url
      text
      location
      time
      createdAt
      width
      height
      owner {
        username
      }
    }
  }
}
    `;

/**
 * __useGetOneAlbumQuery__
 *
 * To run a query within a React component, call `useGetOneAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneAlbumQuery(baseOptions: Apollo.QueryHookOptions<GetOneAlbumQuery, GetOneAlbumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneAlbumQuery, GetOneAlbumQueryVariables>(GetOneAlbumDocument, options);
      }
export function useGetOneAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneAlbumQuery, GetOneAlbumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneAlbumQuery, GetOneAlbumQueryVariables>(GetOneAlbumDocument, options);
        }
export type GetOneAlbumQueryHookResult = ReturnType<typeof useGetOneAlbumQuery>;
export type GetOneAlbumLazyQueryHookResult = ReturnType<typeof useGetOneAlbumLazyQuery>;
export type GetOneAlbumQueryResult = Apollo.QueryResult<GetOneAlbumQuery, GetOneAlbumQueryVariables>;
export const GetPresignedUrlDocument = gql`
    query GetPresignedUrl($filename: String!) {
  presignedUrl(filename: $filename)
}
    `;

/**
 * __useGetPresignedUrlQuery__
 *
 * To run a query within a React component, call `useGetPresignedUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPresignedUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPresignedUrlQuery({
 *   variables: {
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useGetPresignedUrlQuery(baseOptions: Apollo.QueryHookOptions<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>(GetPresignedUrlDocument, options);
      }
export function useGetPresignedUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>(GetPresignedUrlDocument, options);
        }
export type GetPresignedUrlQueryHookResult = ReturnType<typeof useGetPresignedUrlQuery>;
export type GetPresignedUrlLazyQueryHookResult = ReturnType<typeof useGetPresignedUrlLazyQuery>;
export type GetPresignedUrlQueryResult = Apollo.QueryResult<GetPresignedUrlQuery, GetPresignedUrlQueryVariables>;
export const GetUserAlbumsDocument = gql`
    query GetUserAlbums($username: String!) {
  userAlbums(username: $username) {
    id
    name
    createdAt
    owner {
      username
    }
  }
}
    `;

/**
 * __useGetUserAlbumsQuery__
 *
 * To run a query within a React component, call `useGetUserAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAlbumsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserAlbumsQuery(baseOptions: Apollo.QueryHookOptions<GetUserAlbumsQuery, GetUserAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAlbumsQuery, GetUserAlbumsQueryVariables>(GetUserAlbumsDocument, options);
      }
export function useGetUserAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAlbumsQuery, GetUserAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAlbumsQuery, GetUserAlbumsQueryVariables>(GetUserAlbumsDocument, options);
        }
export type GetUserAlbumsQueryHookResult = ReturnType<typeof useGetUserAlbumsQuery>;
export type GetUserAlbumsLazyQueryHookResult = ReturnType<typeof useGetUserAlbumsLazyQuery>;
export type GetUserAlbumsQueryResult = Apollo.QueryResult<GetUserAlbumsQuery, GetUserAlbumsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    username
    lastLogin
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;