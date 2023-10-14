/*
  Warnings:

  - You are about to drop the column `CreatedDate` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `ModifiedDate` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `image` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Blogs] ADD [image] VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Menu] DROP COLUMN [CreatedDate],
[ModifiedDate];
ALTER TABLE [dbo].[Menu] ADD [createdDate] DATETIME2,
[modifiedDate] DATETIME2;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
