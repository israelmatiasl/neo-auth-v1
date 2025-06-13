USE [billcrux_8k];
GO

-- Crear tblUser si no existe
IF OBJECT_ID('dbo.tblUser', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[tblUser] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [userNumber] INT NOT NULL,
        [userID] NVARCHAR(52) NOT NULL,
        [userPwd] NVARCHAR(100) NULL,
        [cpId] INT NULL,
        [userTypeId] TINYINT NULL,
        [userStatusId] TINYINT NULL,
        [gameServiceId] SMALLINT NULL,
        [apply] TINYINT NULL,
        CONSTRAINT UQ_tblUser_userNumber UNIQUE ([userNumber])
    );
END
GO

-- Crear tblUserDetail si no existe
IF OBJECT_ID('dbo.tblUserDetail', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[tblUserDetail] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [userNumber] INT NOT NULL,
        [handphoneNumber] NVARCHAR(34) NULL,
        [jobTypeId] NVARCHAR(50) NULL,
        [isSendEmail] BIT NULL,
        [parentName] NVARCHAR(16) NULL,
        [parentSsno] NCHAR(13) NULL,
        [parentPhoneNumber] NVARCHAR(16) NULL,
        [placeToPlay] NVARCHAR(40) NULL,
        [internetConnection] NVARCHAR(30) NULL
    );
END
GO

-- Crear tblUserInfo si no existe
IF OBJECT_ID('dbo.tblUserInfo', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[tblUserInfo] (
        [id] INT IDENTITY(1,1) PRIMARY KEY,
        [userNumber] INT NOT NULL,
        [userID] NVARCHAR(52) NOT NULL,
        [userPwd] NVARCHAR(70) NULL,
        [userKey] NVARCHAR(7) NULL,
        [cpId] INT NULL,
        [userSurName] NVARCHAR(64) NULL,
        [MI] NVARCHAR(1) NULL,
        [userFirstName] NVARCHAR(64) NULL,
        [userTypeId] TINYINT NULL,
        [userStatusId] TINYINT NULL,
        [gameServiceId] SMALLINT NULL,
        [ssno] NCHAR(13) NULL,
        [sex] BIT NULL,
        [birthday] VARCHAR(50) NULL,
        [isSolar] BIT NULL,
        [email] NVARCHAR(64) NULL,
        [zipcode] NCHAR(6) NULL,
        [nation] NVARCHAR(64) NULL,
        [address] NVARCHAR(256) NULL,
        [city] CHAR(50) NULL,
        [state] NVARCHAR(50) NULL,
        [phoneNumber] NVARCHAR(33) NULL,
        [passwordCheckQuestionTypeId] NVARCHAR(64) NULL,
        [passwordCheckAnswer] NVARCHAR(64) NULL,
        [cashBalance] INT NULL,
        [pointToCashBalance] INT NULL,
        [holdCashBalance] INT NULL,
        [pointBalance] INT NULL,
        [registDt] VARCHAR(50) NULL,
        [apply] TINYINT NULL,
        [boletos] INT NULL,
        [referido] NVARCHAR(50) NULL
    );
END
GO