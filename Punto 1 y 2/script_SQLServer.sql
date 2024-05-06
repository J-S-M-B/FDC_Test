USE [master]
GO
/****** Object:  Database [FDC_Test]    Script Date: 4/05/2024 9:58:51 p. m. ******/
CREATE DATABASE [FDC_Test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FDC_Test', FILENAME = N'C:\SQL Server Data\FDC_Test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FDC_Test_log', FILENAME = N'C:\SQL Server Data\FDC_Test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [FDC_Test] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FDC_Test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FDC_Test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FDC_Test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FDC_Test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FDC_Test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FDC_Test] SET ARITHABORT OFF 
GO
ALTER DATABASE [FDC_Test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FDC_Test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FDC_Test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FDC_Test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FDC_Test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FDC_Test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FDC_Test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FDC_Test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FDC_Test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FDC_Test] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FDC_Test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FDC_Test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FDC_Test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FDC_Test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FDC_Test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FDC_Test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FDC_Test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FDC_Test] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FDC_Test] SET  MULTI_USER 
GO
ALTER DATABASE [FDC_Test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FDC_Test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FDC_Test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FDC_Test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FDC_Test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FDC_Test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [FDC_Test] SET QUERY_STORE = ON
GO
ALTER DATABASE [FDC_Test] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [FDC_Test]
GO
/****** Object:  Table [dbo].[Departamento]    Script Date: 4/05/2024 9:58:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departamento](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](100) NULL,
	[JefeDepartamentoId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Empleado]    Script Date: 4/05/2024 9:58:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleado](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](100) NULL,
	[DepartamentoId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proyecto]    Script Date: 4/05/2024 9:58:51 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proyecto](
	[Id] [int] NOT NULL,
	[Nombre] [varchar](100) NULL,
	[ResponsableId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Departamento] ([Id], [Nombre], [JefeDepartamentoId]) VALUES (1, N'Departamento de Ventas', 1)
INSERT [dbo].[Departamento] ([Id], [Nombre], [JefeDepartamentoId]) VALUES (2, N'Departamento de Recursos Humanos', 2)
INSERT [dbo].[Departamento] ([Id], [Nombre], [JefeDepartamentoId]) VALUES (3, N'Departamento de Tecnología', 3)
GO
INSERT [dbo].[Empleado] ([Id], [Nombre], [DepartamentoId]) VALUES (1, N'Juan Perez', 1)
INSERT [dbo].[Empleado] ([Id], [Nombre], [DepartamentoId]) VALUES (2, N'María López', 2)
INSERT [dbo].[Empleado] ([Id], [Nombre], [DepartamentoId]) VALUES (3, N'Pedro Ramirez', 1)
INSERT [dbo].[Empleado] ([Id], [Nombre], [DepartamentoId]) VALUES (4, N'Ana Martínez', 3)
INSERT [dbo].[Empleado] ([Id], [Nombre], [DepartamentoId]) VALUES (5, N'Carlos Sanchez', 2)
GO
INSERT [dbo].[Proyecto] ([Id], [Nombre], [ResponsableId]) VALUES (1, N'Implementación del sistema de gestión de ventas', 1)
INSERT [dbo].[Proyecto] ([Id], [Nombre], [ResponsableId]) VALUES (2, N'Reestructuración del proceso de reclutamiento', 2)
INSERT [dbo].[Proyecto] ([Id], [Nombre], [ResponsableId]) VALUES (3, N'Desarrollo de una nueva aplicación móvil', 3)
INSERT [dbo].[Proyecto] ([Id], [Nombre], [ResponsableId]) VALUES (4, N'Optimización del sistema de gestión de inventario', 1)
INSERT [dbo].[Proyecto] ([Id], [Nombre], [ResponsableId]) VALUES (5, N'Lanzamiento de una campaña publicitaria', 2)
GO
ALTER TABLE [dbo].[Departamento]  WITH CHECK ADD FOREIGN KEY([JefeDepartamentoId])
REFERENCES [dbo].[Empleado] ([Id])
GO
ALTER TABLE [dbo].[Proyecto]  WITH CHECK ADD FOREIGN KEY([ResponsableId])
REFERENCES [dbo].[Empleado] ([Id])
GO
USE [master]
GO
ALTER DATABASE [FDC_Test] SET  READ_WRITE 
GO
