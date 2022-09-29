import { CognitoUserPool } from 'amazon-cognito-identity-js';

function Pool() {
  const poolData = {
    UserPoolId: 'us-east-1_8mJGtAJCM',
    ClientId: '4q2ntnp0j789e8tle50n5h9hr',
  };

  return new CognitoUserPool(poolData);
}

export default Pool;
