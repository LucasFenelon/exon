import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_8mJGtAJCM',
  ClientId: '4q2ntnp0j789e8tle50n5h9hr',
};

export default new CognitoUserPool(poolData);
