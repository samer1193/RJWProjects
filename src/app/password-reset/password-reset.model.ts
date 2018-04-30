export interface SecurityQuestions {
    answer1: string;
    answer2: string;
    answer3: string;
    confirmPassword: string;
    id: string;
    password: string;
    passwordToken: string;
    securityQuestion1: SecurityQuestion1;
    securityQuestion2: SecurityQuestion2;
    securityQuestion3: SecurityQuestion3;
    selectedSecurityQuestion1Id: number;
    selectedSecurityQuestion2Id: number;
    selectedSecurityQuestion3Id: number;
    userName: string;
    message: string;
    token: string;
}

 export interface SecurityQuestion1{
     groupId: number;
     id: number;
     question: string;

 }
 export interface SecurityQuestion2{
    groupId: number;
    id: number;
    question: string;
}
export interface SecurityQuestion3{
    groupId: number;
    id: number;
    question: string;
}