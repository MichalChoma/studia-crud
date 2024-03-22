#!/bin/sh

psql -U moj_admin -d baza_blogpost < /dbbackup/dump-baza_blogpost-202403221334.sql

exit