--------------------------------------------------
-- Create Database
--------------------------------------------------

IF DB_ID('DB_CEIH') IS NULL
BEGIN
    CREATE DATABASE DB_CEIH;
END
GO

USE DB_CEIH;
GO

--------------------------------------------------
-- Users Table
--------------------------------------------------

CREATE TABLE Users
(
    userId UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),

    firstName VARCHAR(100) NOT NULL,

    lastName VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phoneNumber VARCHAR(20) NULL,

    profileImage VARBINARY(MAX) NULL,

    createdAt DATETIME DEFAULT GETDATE(),

    lastLogin DATETIME NULL,

    CONSTRAINT Users_PK PRIMARY KEY (userId),

    CONSTRAINT Users_UK UNIQUE (email)
);
GO

--------------------------------------------------
-- User Credentials Table
--------------------------------------------------

CREATE TABLE UserCredentials
(
    credentialId INT IDENTITY(1,1) NOT NULL,

    userId UNIQUEIDENTIFIER NOT NULL,

    hashedPassword VARCHAR(MAX) NOT NULL,

    CONSTRAINT UserCredentials_PK PRIMARY KEY (credentialId),

    CONSTRAINT UserCredentials_User_FK
        FOREIGN KEY (userId)
        REFERENCES Users(userId),

    CONSTRAINT UserCredentials_UK UNIQUE (userId)
);
GO

--------------------------------------------------
-- Roles Table
--------------------------------------------------

CREATE TABLE Roles
(
    roleId INT IDENTITY(1,1) NOT NULL,

    roleName VARCHAR(50) NOT NULL,

    CONSTRAINT Roles_PK PRIMARY KEY (roleId),

    CONSTRAINT Roles_UK UNIQUE (roleName)
);
GO

--------------------------------------------------
-- User Roles Junction Table
--------------------------------------------------

CREATE TABLE UsersRoles
(
    userId UNIQUEIDENTIFIER NOT NULL,

    roleId INT NOT NULL,

    assignedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT UsersRoles_PK PRIMARY KEY (userId, roleId),

    CONSTRAINT UsersRoles_User_FK
        FOREIGN KEY (userId)
        REFERENCES Users(userId),

    CONSTRAINT UsersRoles_Role_FK
        FOREIGN KEY (roleId)
        REFERENCES Roles(roleId)
);
GO

--------------------------------------------------
-- Role Applications Table
--------------------------------------------------

CREATE TABLE RoleApplications
(
    applicationId INT IDENTITY(1,1) NOT NULL,

    userId UNIQUEIDENTIFIER NOT NULL,

    requestedRole VARCHAR(50) NOT NULL,

    verificationStatus VARCHAR(50) NOT NULL DEFAULT 'pending',

    verificationData NVARCHAR(MAX) NULL,

    reviewedBy UNIQUEIDENTIFIER NULL,

    reviewedAt DATETIME NULL,

    createdAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT RoleApplications_PK PRIMARY KEY (applicationId),

    CONSTRAINT RoleApplications_User_FK
        FOREIGN KEY (userId)
        REFERENCES Users(userId),

    CONSTRAINT RoleApplications_Reviewer_FK
        FOREIGN KEY (reviewedBy)
        REFERENCES Users(userId)
);
GO

--------------------------------------------------
-- Seed Roles
--------------------------------------------------

INSERT INTO Roles
    (roleName)
VALUES
    ('patient'),
    ('clinician'),
    ('doctor'),
    ('pharmacy'),
    ('custodian'),
    ('admin');
GO