PGDMP  4    7                |            FDC_Test    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16463    FDC_Test    DATABASE     �   CREATE DATABASE "FDC_Test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE "FDC_Test";
                postgres    false                        2615    16554    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                        0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    16611    departamentos    TABLE     k   CREATE TABLE public.departamentos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);
 !   DROP TABLE public.departamentos;
       public         heap    postgres    false    5            �            1259    16610    departamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.departamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.departamentos_id_seq;
       public          postgres    false    216    5                       0    0    departamentos_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.departamentos_id_seq OWNED BY public.departamentos.id;
          public          postgres    false    215            �            1259    16618 	   empleados    TABLE     �   CREATE TABLE public.empleados (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    departamentoid integer
);
    DROP TABLE public.empleados;
       public         heap    postgres    false    5            �            1259    16617    empleados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.empleados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.empleados_id_seq;
       public          postgres    false    218    5                       0    0    empleados_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.empleados_id_seq OWNED BY public.empleados.id;
          public          postgres    false    217            �            1259    16630 	   proyectos    TABLE     �   CREATE TABLE public.proyectos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    responsableid integer
);
    DROP TABLE public.proyectos;
       public         heap    postgres    false    5            �            1259    16629    proyectos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proyectos_id_seq;
       public          postgres    false    5    220                       0    0    proyectos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;
          public          postgres    false    219            Z           2604    16614    departamentos id    DEFAULT     t   ALTER TABLE ONLY public.departamentos ALTER COLUMN id SET DEFAULT nextval('public.departamentos_id_seq'::regclass);
 ?   ALTER TABLE public.departamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            [           2604    16621    empleados id    DEFAULT     l   ALTER TABLE ONLY public.empleados ALTER COLUMN id SET DEFAULT nextval('public.empleados_id_seq'::regclass);
 ;   ALTER TABLE public.empleados ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            \           2604    16633    proyectos id    DEFAULT     l   ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);
 ;   ALTER TABLE public.proyectos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �          0    16611    departamentos 
   TABLE DATA           3   COPY public.departamentos (id, nombre) FROM stdin;
    public          postgres    false    216   ,       �          0    16618 	   empleados 
   TABLE DATA           ?   COPY public.empleados (id, nombre, departamentoid) FROM stdin;
    public          postgres    false    218   I       �          0    16630 	   proyectos 
   TABLE DATA           >   COPY public.proyectos (id, nombre, responsableid) FROM stdin;
    public          postgres    false    220   f                  0    0    departamentos_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.departamentos_id_seq', 1, false);
          public          postgres    false    215                       0    0    empleados_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.empleados_id_seq', 1, false);
          public          postgres    false    217                       0    0    proyectos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.proyectos_id_seq', 1, false);
          public          postgres    false    219            ^           2606    16616     departamentos departamentos_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.departamentos
    ADD CONSTRAINT departamentos_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.departamentos DROP CONSTRAINT departamentos_pkey;
       public            postgres    false    216            `           2606    16623    empleados empleados_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.empleados DROP CONSTRAINT empleados_pkey;
       public            postgres    false    218            b           2606    16635    proyectos proyectos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_pkey;
       public            postgres    false    220            c           2606    16624 '   empleados empleados_departamentoid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_departamentoid_fkey FOREIGN KEY (departamentoid) REFERENCES public.departamentos(id);
 Q   ALTER TABLE ONLY public.empleados DROP CONSTRAINT empleados_departamentoid_fkey;
       public          postgres    false    218    4702    216            d           2606    16636 &   proyectos proyectos_responsableid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_responsableid_fkey FOREIGN KEY (responsableid) REFERENCES public.empleados(id);
 P   ALTER TABLE ONLY public.proyectos DROP CONSTRAINT proyectos_responsableid_fkey;
       public          postgres    false    218    220    4704            �      x������ � �      �      x������ � �      �      x������ � �     