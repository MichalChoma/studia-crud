--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 15.3

-- Started on 2024-03-22 13:35:02

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- CREATE SCHEMA public;


-- ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2957 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

-- COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 206 (class 1259 OID 16413)
-- Name: Blog; Type: TABLE; Schema: public; Owner: moj_admin
--

CREATE TABLE public."Blog" (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public."Blog" OWNER TO moj_admin;

--
-- TOC entry 205 (class 1259 OID 16411)
-- Name: Blog_id_seq; Type: SEQUENCE; Schema: public; Owner: moj_admin
--

CREATE SEQUENCE public."Blog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Blog_id_seq" OWNER TO moj_admin;

--
-- TOC entry 2959 (class 0 OID 0)
-- Dependencies: 205
-- Name: Blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: moj_admin
--

ALTER SEQUENCE public."Blog_id_seq" OWNED BY public."Blog".id;


--
-- TOC entry 204 (class 1259 OID 16402)
-- Name: User; Type: TABLE; Schema: public; Owner: moj_admin
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."User" OWNER TO moj_admin;

--
-- TOC entry 203 (class 1259 OID 16400)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: moj_admin
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO moj_admin;

--
-- TOC entry 2960 (class 0 OID 0)
-- Dependencies: 203
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: moj_admin
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 202 (class 1259 OID 16388)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: moj_admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO moj_admin;

--
-- TOC entry 2812 (class 2604 OID 16416)
-- Name: Blog id; Type: DEFAULT; Schema: public; Owner: moj_admin
--

ALTER TABLE ONLY public."Blog" ALTER COLUMN id SET DEFAULT nextval('public."Blog_id_seq"'::regclass);


--
-- TOC entry 2811 (class 2604 OID 16405)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: moj_admin
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 2951 (class 0 OID 16413)
-- Dependencies: 206
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: moj_admin
--

INSERT INTO public."Blog" VALUES (2, 'Tytul Lorem Ipsum', 'Facilisi morbi tempus iaculis urna id volutpat lacus. Enim praesent elementum facilisis leo vel. Placerat vestibulum lectus mauris ultrices eros in cursus turpis massa. Tellus at urna condimentum mattis pellentesque id nibh. Mi eget mauris pharetra et ultrices neque ornare. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Aliquet bibendum enim facilisis gravida. Nisi scelerisque eu ultrices vitae auctor eu. Donec ac odio tempor orci dapibus ultrices in iaculis nunc. Tempor nec feugiat nisl pretium.', 1);
INSERT INTO public."Blog" VALUES (3, 'Tytul Lorem Ipsum 2', 'Porttitor eget dolor morbi non arcu risus quis varius quam. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Et ligula ullamcorper malesuada proin libero. Enim nulla aliquet porttitor lacus luctus accumsan. Dolor purus non enim praesent elementum facilisis. Eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Enim blandit volutpat maecenas volutpat blandit aliquam etiam.', 1);
INSERT INTO public."Blog" VALUES (17, '44', 'fsfsfsf', 1);
INSERT INTO public."Blog" VALUES (4, 'Lorem edited 3', 'Turpis massa sed elementum tempus egestas. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus. Amet porttitor eget dolor morbi non arcu risus quis varius. Habitant morbi tristique senectus et netus et malesuada. Vehicula ipsum a arcu cursus vitae. Est ultricies integer quis auctor elit sed. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Arcu cursus vitae congue mauris rhoncus. Elit ullamcorper dignissim cras tincidunt. ---------------- edited', 1);
INSERT INTO public."Blog" VALUES (18, 'usususususus', 'usdsafasfasfasf', 1);
INSERT INTO public."Blog" VALUES (6, 'title', 'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcofcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentntentcontent dupa', 1);
INSERT INTO public."Blog" VALUES (10, 'new blog 2', 'new blog content 2 - edited', 2);
INSERT INTO public."Blog" VALUES (8, 'create', 'create blog
', 2);
INSERT INTO public."Blog" VALUES (14, 'trzeci blog new blog', 'content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content content ', 3);
INSERT INTO public."Blog" VALUES (1, 'Tytul 1 - updated 2', 'Volutpat sed cras ornare arcu dui vivamus arcu. Id semper risus in hendrerit gravida rutrum quisque non. Urna cursus eget nunc scelerisque viverra mauris in aliquam. Magna etiam tempor orci eu lobortis elementum nibh tellus. Iaculis urna id volutpat lacus laoreet. Nisl purus in mollis nunc sed. Auctor elit sed vulputate mi sit amet mauris commodo. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Mattis aliquam faucibus purus in massa tempor. Eget magna fermentum iaculis eu non diam.', 1);


--
-- TOC entry 2949 (class 0 OID 16402)
-- Dependencies: 204
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: moj_admin
--

INSERT INTO public."User" VALUES (1, 'pierwszyUser', '$2a$10$nqc.NFBuimwubytjep/PfekhtLNeo0Sd6mGDgT7ziSll5IH2B6ifG');
INSERT INTO public."User" VALUES (2, 'drugiUser', '$2a$10$Y8gBp/YnJmZUGamJ2Jxr5.BZRQ4t39gWK9.OKvSrid/Ne.XXl6wzW');
INSERT INTO public."User" VALUES (3, 'trzeci', '$2a$10$q5jUL3pJnlVnOnLhQeRmgepIw.8ZA91Ks6iEcc1K8nxU7ioD440Lm');
INSERT INTO public."User" VALUES (4, 'nowy user', '$2a$10$x6kU2XXm/2MaXguypk3JhegI5lhOqkuqvciBtSiUHYjte7uERpj4q');


--
-- TOC entry 2947 (class 0 OID 16388)
-- Dependencies: 202
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: moj_admin
--

INSERT INTO public._prisma_migrations VALUES ('c642f663-852a-4f7e-8da6-f68d58b51d82', '5afd24f0500848fd60b205fa6534cfe32405cbccae9a022da9fcad962d240271', '2023-12-13 00:02:17.431523+01', '20231212230217_create_user_table', NULL, NULL, '2023-12-13 00:02:17.413723+01', 1);


--
-- TOC entry 2961 (class 0 OID 0)
-- Dependencies: 205
-- Name: Blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: moj_admin
--

SELECT pg_catalog.setval('public."Blog_id_seq"', 18, true);


--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 203
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: moj_admin
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- TOC entry 2819 (class 2606 OID 16421)
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: moj_admin
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- TOC entry 2816 (class 2606 OID 16410)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: moj_admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 2814 (class 2606 OID 16397)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: moj_admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2817 (class 1259 OID 16422)
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: moj_admin
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- TOC entry 2820 (class 2606 OID 16423)
-- Name: Blog Blog_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: moj_admin
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-03-22 13:35:02

--
-- PostgreSQL database dump complete
--

