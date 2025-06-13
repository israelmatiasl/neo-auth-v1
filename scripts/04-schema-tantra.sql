USE [tantra_azteca];
GO

IF OBJECT_ID('dbo.TantraItem', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[TantraItem] (
        [ID] INT IDENTITY(1,1) PRIMARY KEY,
        [World] INT NULL,
        [Account] VARCHAR(50) NOT NULL,
        [ItemIndex] INT NOT NULL,
        [ItemCount] SMALLINT DEFAULT 1,
        [Regalo] TINYINT DEFAULT 0,
        [Fecha] DATETIME DEFAULT GETDATE()
    );
END
GO