USE [NeoImperio];
GO

IF OBJECT_ID('dbo.Cuentas', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Cuentas] (
        [ID] INT IDENTITY(1,1) PRIMARY KEY,
        [UserID] NVARCHAR(50) NOT NULL UNIQUE,
        [Hash] NVARCHAR(255) NOT NULL,
        [Password] NVARCHAR(50) NOT NULL,
        [Email] NVARCHAR(100) NOT NULL UNIQUE,
        [Nombre] NVARCHAR(100) NOT NULL,
        [Apellido] NVARCHAR(100) NOT NULL,
        [Sexo] BIT NULL,
        [Pais] NVARCHAR(2) NULL,
        [FechaNacimiento] SMALLDATETIME NULL,
        [FechaRegistro] DATETIME DEFAULT GETDATE(),
        [Bloqueado] BIT DEFAULT 0,
        [Afectado] BIT DEFAULT 0,
        [Cotizacion] INT DEFAULT 0,
        [TanysEntregados] INT DEFAULT 0,
        [Diferencia] INT DEFAULT 0,
        [TanysGastados] INT DEFAULT 0,
        [SaldoPorPoner] INT DEFAULT 0,
        [ReglamentoAceptado] BIT DEFAULT 0,
        [ResetsWooby] TINYINT DEFAULT 0
    );
END
GO