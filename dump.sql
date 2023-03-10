PGDMP     0                    z            Shortly %   12.12 (Ubuntu 12.12-0ubuntu0.20.04.1) %   12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16428    Shortly    DATABASE     {   CREATE DATABASE "Shortly" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';
    DROP DATABASE "Shortly";
                postgres    false            ?            1259    16531    sessions    TABLE     ?   CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    userid integer NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            ?            1259    16529    sessions_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    207            ?           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    206            ?            1259    16513    urls    TABLE     ?   CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    shorturl text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    userid integer NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.urls;
       public         heap    postgres    false            ?            1259    16511    urls_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.urls_id_seq;
       public          postgres    false    205            ?           0    0    urls_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;
          public          postgres    false    204            ?            1259    16478    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "linksCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    16476    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            (           2604    16534    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            %           2604    16516    urls id    DEFAULT     b   ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);
 6   ALTER TABLE public.urls ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            !           2604    16481    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            ?          0    16531    sessions 
   TABLE DATA           @   COPY public.sessions (id, token, userid, createdat) FROM stdin;
    public          postgres    false    207   ?       ?          0    16513    urls 
   TABLE DATA           R   COPY public.urls (id, url, shorturl, "visitCount", userid, createdat) FROM stdin;
    public          postgres    false    205   J       ?          0    16478    users 
   TABLE DATA           c   COPY public.users (id, name, email, password, "visitCount", "linksCount", "createdAt") FROM stdin;
    public          postgres    false    203   k       ?           0    0    sessions_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);
          public          postgres    false    206            ?           0    0    urls_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.urls_id_seq', 18, true);
          public          postgres    false    204            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    202            /           2606    16540    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    207            -           2606    16523    urls urls_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_pkey;
       public            postgres    false    205            +           2606    16486    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            0           2606    16524    urls urls_userid_fkey    FK CONSTRAINT     s   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);
 ?   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_userid_fkey;
       public          postgres    false    2859    203    205            ?   ?   x?mα!??p???$@??D??|???oV?5I޼i?l2>I???";??>VP? 	??ܦ???!????D?	?H#??4|(%sb?w?Q?g??v<U??9?3Y??V??g+x?g???????R?????ݟ?df?2?i?5??????.k?T?W????<q      ?     x?m??N?@???S?Xvf??7+M?Hc?/??b??V[?^$CC?????????????r?Z?X??-??|f?!C?F?3??G+?Ԋ??n?z[=N?"|?i?????x4???A????u?i??=dt???S"?4Nkv̱?x??V?ی?Im?mq??>?㺯????4j?`T^΀<(??+???0??b??L)K/??{???i???i?m߆|{?w}??7??~? `??]??*o????$?~??????h?????? ?}R      ?     x?u??N?@????*\t?d柞芊???
?7=??B;@?????xc??c̗|?7 ?{?_??m???R?H?B?D??u1Snu	\HA??pq:s??,zWl?0x???:??n???? E@  7th2?0?%?\??.P#r1???#ﾒ??W???z??{;:???̽W?ܲ?g?S???[?Rݣu?E?fYMƈ꿫@L?M6?
cD????ӟLݴ?┚??[;?.??'6?5?Wgg????S#e??????u?2??$I??+bN     