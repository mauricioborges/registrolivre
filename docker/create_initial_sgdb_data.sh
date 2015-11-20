#!/bin/bash

psql -c "CREATE ROLE registro_livre_user WITH ENCRYPTED PASSWORD 'registro_livre_user' LOGIN;" -U postgres
psql -c "CREATE DATABASE registro_livre WITH OWNER = registro_livre_user;" -U postgres
