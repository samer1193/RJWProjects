export interface UserSetup {
    answer1: string;
    answer2: string;
    answer3: string;
    confirmPassword: string;
    id: string;
    password: string;
    passwordToken: string;
    securityQuestion1: securityQuestion1;
    securityQuestion2: securityQuestion2;
    securityQuestion3: securityQuestion3;
    securityQuestionGroup1: SecurityQuestionGroup1;
    securityQuestionGroup2: SecurityQuestionGroup2;
    securityQuestionGroup3: SecurityQuestionGroup3;
    userName: string;
    message: string;
    token: string;
}

 export interface SecurityQuestionGroup1{
     groupId: string;
     id: string;
     question: string;

 }
 export interface SecurityQuestionGroup2{
    groupId: string;
    id: string;
    question: string;
}
export interface SecurityQuestionGroup3{
    groupId: string;
    id: string;
    question: string;
}
export interface securityQuestion1{
    groupId: string;
    id: string;
    question: string;

}
export interface securityQuestion2{
    groupId: string;
    id: string;
    question: string;

}
export interface securityQuestion3{
    groupId: string;
    id: string;
    question: string;

}