USE [NeoImperio];
GO

IF OBJECT_ID('dbo.Cuentas', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Cuentas] (
        [CuentaID] INT IDENTITY(1,1) PRIMARY KEY,
        [UserID] NVARCHAR(50) NOT NULL UNIQUE,
        [Hash] NVARCHAR(255) NULL,
        [Password] NVARCHAR(50) NOT NULL,
        [Email] NVARCHAR(100) NULL,
        [Nombre] NVARCHAR(100) NULL,
        [Apellido] NVARCHAR(100) NULL,
        [Sexo] BIT NULL,
        [Pais] NVARCHAR(2) NULL,
        [FechaNacimiento] SMALLDATETIME NULL,
        [FechaRegistro] DATETIME NULL,
        [Bloqueado] BIT NOT NULL DEFAULT 0,
        [Afectado] BIT NULL,
        [Cotizacion] INT NULL,
        [TanysEntregados] INT NULL,
        [Diferencia] INT NULL,
        [TanysGastados] INT NULL,
        [SaldoPorPoner] INT NULL,
        [ReglamentoAceptado] BIT NULL,
        [ResetsWooby] TINYINT NULL
    );
END
GO