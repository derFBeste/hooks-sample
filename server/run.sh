#!/bin/bash

COMMAND=$1;
shift

case "$COMMAND" in

    dev)
        export FLASK_APP=server.py
        export FLASK_DEBUG=1
        flask run --port=8888
    ;;

    install)
        pip3 install -e .
    ;;

esac

# TODO: add env-actviate option: . venv/bin/activate