PGDMP      -                |            FDC_Test    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    16581    departamento    TABLE     �   CREATE TABLE public.departamento (
    id integer NOT NULL,
    nombre character varying(100),
    jefedepartamentoid integer
);
     DROP TABLE public.departamento;
       public         heap    postgres    false    5            �            1259    16576    empleado    TABLE     y   CREATE TABLE public.empleado (
    id integer NOT NULL,
    nombre character varying(100),
    departamentoid integer
);
    DROP TABLE public.empleado;
       public         heap    postgres    false    5            �            1259    16591    proyecto    TABLE     x   CREATE TABLE public.proyecto (
    id integer NOT NULL,
    nombre character varying(100),
    responsableid integer
);
    DROP TABLE public.proyecto;
       public         heap    postgres    false    5            �          0    16581    departamento 
   TABLE DATA           F   COPY public.departamento (id, nombre, jefedepartamentoid) FROM stdin;
    public          postgres    false    216   P       �          0    16576    empleado 
   TABLE DATA           >   COPY public.empleado (id, nombre, departamentoid) FROM stdin;
    public          postgres    false    215   �       �          0    16591    proyecto 
   TABLE DATA           =   COPY public.proyecto (id, nombre, responsableid) FROM stdin;
    public          postgres    false    217          Z           2606    16585    departamento departamento_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_pkey;
       public            postgres    false    216            X           2606    16580    empleado empleado_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT empleado_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.empleado DROP CONSTRAINT empleado_pkey;
       public            postgres    false    215            \           2606    16595    proyecto proyecto_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT proyecto_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.proyecto DROP CONSTRAINT proyecto_pkey;
       public            postgres    false    217            ]           2606    16586 1   departamento departamento_jefedepartamentoid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_jefedepartamentoid_fkey FOREIGN KEY (jefedepartamentoid) REFERENCES public.empleado(id);
 [   ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_jefedepartamentoid_fkey;
       public          postgres    false    4696    216    215            ^           2606    16596 $   proyecto proyecto_responsableid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT proyecto_responsableid_fkey FOREIGN KEY (responsableid) REFERENCES public.empleado(id);
 N   ALTER TABLE ONLY public.proyecto DROP CONSTRAINT proyecto_responsableid_fkey;
       public          postgres    false    4696    217    215            �   N   x�3�tI-H,*I�M�+�WHIU2�9��0��R�K���<Js��9���1��&����^��i����� �p!�      �   [   x�3��*M�SH-J��4�2��M,:�6Q�������1g@jJQ�BPbn&D�	�c^�P]��y@c.SN�Ģ��b��ļ���=... w�      �   �   x���K
�@�יS�	�V��A\��c�@�Af���Jz�^�i���]��?��>	y
�S�O�9��n��\6��+Cgz�Qӵ�R�'�4:�q�*9�=�L����DU����m�4��$�?O�������?��K96�#\0���wǡO8�Ѧ�h[���1�wƘ)T_h     