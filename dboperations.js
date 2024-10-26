var config = require('./dbconfig');
const sql = require("mssql");
const jwt = require('jsonwebtoken')
const cookieParser =require('cookie-parser')
var CryptoJS = require("crypto-js");





////// end txg global


async function getCountry(){

    // try{


    //     let pool = await sql.connect(config);
    //     let procountry = await pool.request().query("select * from tblCountryMaster");
    //     return procountry.recordsets;

    // }catch(error){
    //     console.log(error);
    // }

    try{

     const conn= await sql.connect(config);
     const res =await conn.request()
    .execute("USP_GetCountry");
     return res;

    }catch(error){
        console.log(error);
    }
}

async function statelist(prod){

    try{

        console.log(prod.catid)
            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("catid",prod.catid)
            .execute("usp_getStatelist");
            return res;
    }catch(error){
        console.log(error);
    }

}



async function getCheckSpnsor(prod){
    console.log(prod.userId);
    console.log(prod.memberid);

    try
    {


        const conn= await sql.connect(config);
        const res =await conn.request()
        .input("SponsorMemberId",prod.sponserid)    
        .execute("USP_IsSposorExists");
        return res;


    }catch(error){
       console.log(error);
    }
      
}

  async function insertReg(prod){
        console.log(prod.userId);
        console.log(prod.memberid);
    
        try
        {


            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("SPONSORID",prod.sponserid)
            .input("INTRODUCERUSEID","")
            .input("TITLE",prod.title)
            .input("COUNTRY",prod.country)
            .input("State",prod.state)
            .input("FIRSTNAME",prod.firstname)
            .input("LastName",prod.lastname)
            .input("MOBILENO",prod.mobile)
            .input("EMAILID",prod.email)
            .input("Address",prod.address)
            .input("pincode",prod.pincode)
            .input("city",prod.city)
            .input("aadharno",prod.aadharno)
            .input("panno",prod.panno)
            .input("PWD",prod.password)
          
            .execute("USP_Register");
            return res;


        }catch(error){
           console.log(error);
        }
          
}


async function getwelcome(prod){
    console.log(prod.memberid);
          try{
            
            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("UserID",prod.memberid)
          
            .execute("USP_GetWelComeLetterDt");
            return res;
                          
          }catch(error){
              console.log(error);
          }
      
      }

async function adminapi(prod){
    console.log('start--sp');
    console.log(prod.email);
    console.log(prod.password);
    console.log(prod.ip);
    console.log(prod.url);

    try{
            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("USERID",prod.email)
            .input("PASSWORD",prod.password)
            .input("IP",prod.ip)
            .input("URL",prod.url)           
            .execute("USP_VALIDATELOGIN_NEW");
            return res;
    }catch(error){
        console.log(error);
    }

}



async function getdashboard(prod){

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(prod.userid, 'msecret-keys@9128');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
console.log('TT '+decryptedData);

    try{
            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("USERID",decryptedData)
            .execute("USP_GetCustomerDashBoardDtls_New");
            return res;
    }catch(error){
        console.log(error);
    }

}


async function getName(prod){
console.log(prod.userId);
console.log(prod.memberid);
      try{
              const conn= await sql.connect(config);
              const res =await conn.request()
              .input("sessionid",prod.userId)
              .input("userid",prod.memberid)
              .execute("USP_CheckDownlineUser");
              return res;
      }catch(error){
          console.log(error);
      }
  
  }
  
  

  async function getbalancebywallet(prod){
    console.log(prod.userId);
    console.log(prod.walletType);

          try{
                  const conn= await sql.connect(config);
                  const res =await conn.request()
                  .input("userid",prod.userId)
                  .input("walletType",prod.walletType)
                  .execute("Usp_GetBalanceby_wallet");
                  return res;
          }catch(error){
              console.log(error);
          }
      
      }

async function updatepassword(prod){

    try{
        
        console.log(prod.userId);
        console.log('update change Req--1');
        console.log(prod.oldPassword);
        console.log(prod.newPassword);

            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("userid",prod.userId)
            .input("oldpassword",prod.oldPassword)
            .input("newpassword",prod.newPassword)
           
            .execute("USP_UpdateMemberPassword");
            return res;
    }catch(error){
        console.log(error);
    }

}

async function updateadminpwd(prod){

    try{
        
     
        const conn= await sql.connect(config);
        const res =await conn.request()
        .input("userid",prod.userId)
        .input("oldpassword",prod.oldPassword)
        .input("newpassword",prod.newPassword)
           
        .execute("USP_UpdateAdminPassword");
        return res;    
    }catch(error){
        console.log(error);
    }

}
async function getprofileadmin(prod){

    try{
        
      const conn= await sql.connect(config);
            const res =await conn.request()
            .input("MemberID",prod.userId)
            .execute("USP_GetMemberDetailsByMemberID");
            return res;
    }catch(error){
        console.log(error);
    }

}


async function updateprofileadmin(prod){


    try{
      const conn= await sql.connect(config);
            const res =await conn.request()
            .input("TITLE","Mr")
            .input("DIST","")
            .input("STATE","")
            .input("COUNTRY",prod.country)
            .input("FIRSTNAME",prod.name)
            .input("ADDRESS",prod.address)
            .input("CITY",prod.city)
            .input("PINCODE",prod.pincode)
            .input("MOBILENO",prod.mobile)
            .input("EMAILID",prod.email)
            .input("MemberID",prod.userId)
            .execute("Usp_editregistration_member");
            return res;
    }catch(error){
        console.log(error);
    }

}




async function updatebtcaddress(prod){
console.log(prod.userId);

    try{
      const conn= await sql.connect(config);
            const res =await conn.request()
            .input("Address",prod.address)
            .input("MEMBERID",prod.userId)
            .execute("Usp_editTronaddress_member");
            return res;
    }catch(error){
        console.log(error);
    }

}

async function depositrequest(prod){
    
    try{  
      
      console.log("Get Depost Request  sp--- 1");

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("status",prod.status)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_getRequestedDepositDtls_User_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }
    
    
    
    }
    
async function updateapprovedrequest(prod){
    try{
        const conn= await sql.connect(config);
              const res =await conn.request()
              .input("ID",prod.id)
              .execute("USP_ApproveDepositRequest");
              return res;
      }catch(error){
          console.log(error);
      }        
            
        
}

async function updaterejectrequest(prod){
    try{
        const conn= await sql.connect(config);
              const res =await conn.request()
              .input("ID",prod.id)
              .execute("USP_RejectDepositRequest");
              return res;
      }catch(error){
          console.log(error);
      }        
            
        
}



async function roisetting(prod){
    console.log(prod.userId);
    
        try{
          const conn= await sql.connect(config);
                const res =await conn.request()
                .input("roi",prod.roi)
                .execute("updateroi");
                return res;
        }catch(error){
            console.log(error);
        }
    
    }


 async function roilist(prod){

        try{  
          
            console.log("roilist sp--- 1");
               const conn= await sql.connect(config);
                const res =await conn.request()
                .execute("USP_GetRateCurMonth");
                return res;            
    
        }catch(error){
            console.log(error);
        }
    
    }
    

async function upgradeadmin(prod){
        console.log(prod.userId);
        
            try{
              const conn= await sql.connect(config);
                    const res =await conn.request()
                    .input("amount",prod.amount)
                    .input("memberid",prod.userId)
                    .input("Remark",'')
                    .execute("USP_InsertRechargeDtl_admin");
                    return res;
            }catch(error){
                console.log(error);
            }
        
}

async function upgrade(prod){
        console.log(prod.userId);
        
            try{
              const conn= await sql.connect(config);
                    const res =await conn.request()
                    .input("amount",prod.amount)
                    .input("memberid",prod.userId)
                    .input("SessionUserId",prod.sessionID)
                    .input("Remark",'')
                    .execute("USP_InsertRechargeDtl_Online");
                    return res;
            }catch(error){
                console.log(error);
            }
        
}

async function Upgradedetails(prod){
    
    try{  
      
      console.log("Get Upgrade list  sp--- 1");

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_getRechargedtls_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }
    
    
    
    }



async function directteam(prod){

    try{  
      
        console.log("My ditects sp--- 1");


            console.log(prod.userid);
            console.log('---from -'+prod.fromdt);
            console.log('---to -'+prod.todt);
            console.log(prod.page);
            console.log(prod.limit);
          

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("Status",prod.status)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_getMydirects_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }

}


async function teamnetwork(prod){

    try{  
      
        console.log("My Geneology sp--- 1");


            console.log(prod.userid);
            console.log('---from -'+prod.fromdt);
            console.log('---to -'+prod.todt);
            console.log(prod.page);
            console.log(prod.limit);
          

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("Level",prod.level)
            .input("status",prod.status)
            // .input("side",'')
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_GetGenealogy_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }

}

async function dailyincome(prod){

    try{  
      
        console.log("My ditects sp--- 1");


            console.log(prod.userid);
            console.log('---from -'+prod.fromdt);
            console.log('---to -'+prod.todt);
            console.log(prod.page);
            console.log(prod.limit);
          

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("UserID",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_GetDailyCommissionDtls_User_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }

}
async function directincome(prod){

    try{  
      
        console.log("My direct icome sp--- 1");


            console.log(prod.userid);
            console.log('---from -'+prod.fromdt);
            console.log('---to -'+prod.todt);
            console.log(prod.page);
            console.log(prod.limit);
          

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("UserID",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_GetDirectComm_User_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }

}


async function fundtranfer(prod){
    console.log(prod.userId);
    
        try{
          const conn= await sql.connect(config);
                const res =await conn.request()
                .input("MemberId",prod.userId)
                .input("AmountRequested",prod.amount)
                .input("Remarks",prod.remarks)
                .execute("USP_Insert_ClientFundTransfer");
                return res;
        }catch(error){
            console.log(error);
        }
    
    }
async function fundtranferDetails(prod){
    
    try{  
      
      console.log("Get fund transfer list  sp--- 1");

            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_TransferFundDtls_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }
    
    
    
    }

async function walletbalancelist(prod){

try{  
    
    console.log("Get wallet list  sp--- 1");
    console.log(prod.userid);
    console.log(prod.status);


    const conn= await sql.connect(config);
    const res =await conn.request()

    .input("Userid",prod.userid)
    .input("StartDate","")
    .input("EndDate","")
    .input("wallettype",prod.status)
    .input("pageno",prod.page)
    .input("PageSize",prod.limit)
    .input("RecordCount", 10)
    .execute("USP_GetAccountStatement_Admin_Pagination");
    return res;



}catch(error){
    console.log(error);
}

}
async function getministatement(prod){
    
        try{  
          
        
            
              console.log("Get wallet list  sp--- 2");
                const conn= await sql.connect(config);
                const res =await conn.request()
    
                .input("Userid",prod.userid)
                .input("StartDate",prod.starttdate)
                .input("EndDate",prod.enddate)
                .input("wallettype",prod.wallet)
                .input("pageno",prod.page)
                .input("PageSize",prod.limit)
                .input("RecordCount", 10)
                .execute("USP_GetAccountDetails_Admin_Pagination");
                return res;
    
                
    
        }catch(error){
            console.log(error);
        }
        
        
        
        }


 async function membersearch(prod){
    
            try{  
              
              console.log("Get Depost Request  sp--- 1");
        
                    const conn= await sql.connect(config);
                    const res =await conn.request()
        
                    .input("MemberId",prod.userid)
                    .input("Fromd",prod.fromdt)
                    .input("Tod",prod.todt)
                    .input("MemberName",prod.name)
                    .input("pageno",prod.page)
                    .input("PageSize",prod.limit)
                    .input("RecordCount", 10)
                    .execute("USP_getMemberSearchDetails_Pagination");
                    return res;
        
                    
        
            }catch(error){
                console.log(error);
            }
                    
}




async function blockunblock(prod){
    console.log(prod.userId);
    
        try{
          const conn= await sql.connect(config);
                const res =await conn.request()
                .input("UserID",prod.userId)
                .execute("USP_BlockUnblockMemberID");
                return res;
        }catch(error){
            console.log(error);
        }
    
    }



 async function withdrwalrequest(prod){
        console.log(prod.userId);
        
            try{
              const conn= await sql.connect(config);
                    const res =await conn.request()
                    .input("UserID",prod.userId)
                    .input("AmountRequested",prod.amount)
                    .input("Remarks",prod.remarks)
                    .input("wallet", "3")
                    .execute("USP_InsertWithdrawalRequest_admin");
                    return res;
            }catch(error){
                console.log(error);
  }
        
}


    async function withdrwalrequestDetails(prod){
        
        try{  
          
          console.log("Get fund transfer list  sp--- 1");
    
                const conn= await sql.connect(config);
                const res =await conn.request()
    
                .input("Userid",prod.userid)
                .input("StartDate",prod.fromdt)
                .input("EndDate",prod.todt)
                .input("Status",prod.status)
                .input("pageno",prod.page)
                .input("PageSize",prod.limit)
                .input("RecordCount", 10)
                .execute("USP_WithdrawalDtls_Pagination");
                return res;
    
                
    
        }catch(error){
            console.log(error);
        }
        
        
        
}
    



async function withdrwalrequestuser(prod){
    console.log(prod.userId);
    
        try{
          const conn= await sql.connect(config);
                const res =await conn.request()
                .input("UserID",prod.userId)
                .input("AmountRequested",prod.amount)
                .input("Remarks",prod.remarks)
                .input("wallet", "3")
                .execute("USP_InsertWithdrawalRequest_user");
                return res;
        }catch(error){
            console.log(error);
}
    
}




async function ibcommisions(prod){
    
    try{  
      
     
            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_IBCommisionBonus_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }
    
 }

 async function tradingbonus(prod){
    
    try{  
      
     
            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_TradingBonus_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }
    
 }

 async function teamwithwalbous(prod){
    
    try{  
      
     
            const conn= await sql.connect(config);
            const res =await conn.request()

            .input("Userid",prod.userid)
            .input("StartDate",prod.fromdt)
            .input("EndDate",prod.todt)
            .input("pageno",prod.page)
            .input("PageSize",prod.limit)
            .input("RecordCount", 10)
            .execute("USP_TeamWithwalBonus_Pagination");
            return res;

            

    }catch(error){
        console.log(error);
    }
    
 }

 async function getSupportReqUserIDlist(prod){
    
    try{  
      
         const conn= await sql.connect(config);
            const res =await conn.request()
            .execute("USP_GETSupportRequestList");
            return res;
    }catch(error){
        console.log(error);
    }
    
 }

async function insertfundcredit(prod){

    try{
        
        console.log(prod.userId);
        console.log('credit debit  Req--1');
       
            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("userid",prod.userId)
            .input("AMOUNT",prod.amount)
            .input("OPTION",prod.option)
            .input("WALLETTYPE",prod.wallet)
            .input("REMARKS",prod.remarks)
            .execute("USP_UpdateUserEWalletAmount");
            return res;
    }catch(error){
        console.log(error);
    }

}
 

//mobile app api start

async function signinapi(prod){

    try{
            const conn= await sql.connect(config);
            const res =await conn.request()
            .input("USERID",prod.email)
            .input("PASSWORD",prod.password)
            .input("IP",prod.ip)
            .input("URL","")
            .input("DeviceID",prod.diviceid)
            .input("Brand",prod.brand)
            .input("Deviemodel",prod.divicemodel)
            .execute("USP_VALIDATELOGIN_mobileapp");
            return res;
    }catch(error){
        console.log(error);
    }

}
async function getmemberdashboard(prod){

    // Decrypt
   
      try{
              const conn= await sql.connect(config);
              const res =await conn.request()
              .input("USERID",prod.userid)
              .execute("USP_GetCustomerDashBoardDtls_mobileapp");
              return res;
      }catch(error){
          console.log(error);
      }
  
  }
  

//mobile app  end
module.exports ={

    /////  global
    getCheckSpnsor:getCheckSpnsor,
    insertReg:insertReg,
    getwelcome:getwelcome,
    adminapi:adminapi,
    getdashboard:getdashboard,
    updatepassword:updatepassword,
    updateadminpwd:updateadminpwd,
    getName:getName,

    getprofileadmin:getprofileadmin,
    updatebtcaddress:updatebtcaddress,
    getCountry:getCountry,
    statelist:statelist,
    updateprofileadmin:updateprofileadmin,
    directteam:directteam,
    teamnetwork:teamnetwork,
    dailyincome:dailyincome,
    directincome:directincome,
    roisetting:roisetting,
    roilist:roilist,
    depositrequest:depositrequest,
    updateapprovedrequest:updateapprovedrequest,
    updaterejectrequest:updaterejectrequest,

    upgrade:upgrade,
    Upgradedetails:Upgradedetails,
    fundtranfer:fundtranfer,
    fundtranferDetails:fundtranferDetails,
    walletbalancelist:walletbalancelist,
    getministatement:getministatement,
    membersearch:membersearch,
    blockunblock:blockunblock,
    withdrwalrequest:withdrwalrequest,
    withdrwalrequestDetails:withdrwalrequestDetails,
    withdrwalrequestuser:withdrwalrequestuser,
    
    ibcommisions:ibcommisions,
    tradingbonus:tradingbonus,
    teamwithwalbous:teamwithwalbous,
    getbalancebywallet:getbalancebywallet,
    getSupportReqUserIDlist:getSupportReqUserIDlist,
    insertfundcredit:insertfundcredit,
    upgradeadmin:upgradeadmin,


    //mobileapp
    signinapi:signinapi,
    getmemberdashboard:getmemberdashboard


   
}