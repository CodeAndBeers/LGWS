Les loups-garous de Wall Street
===============================

Prerequisites
~~~~~~~~~~~~~

LGWS is a docker based application, you only need two things :

-  `Docker`_ - A Must have !
-  `Docker-compose`_ - Easiest way to handle docker containers

You can easily install docker-compose using pip !

.. code:: sh

    $ sudo apt update && apt install python-pip
    $ pip install docker-compose

Installation
~~~~~~~~~~~~

Only two steps, yes ma’m:

.. code:: sh

    $ git clone https://github.com/CodeAndBeers/LGWS.git && cd LGWS/
    $ docker-compose up -d

Now the project is building, you can take a look when it’s finished by
typing :

.. code:: sh

    $ docker-compose logs

Now take a look at :

http://localhost:8080

How it works
~~~~~~~~~~~~

After running the command above you should have 3 containers :

-  A non-running data only container named “data-client”.
-  A nginx container serving the client data
-  A nodejs server application which handle the game mechanics

Details :

-  Nginx logs are stored in ./nginx folder
-  ./nodejs/.npmrc file allows docker to execute npm command as root
   user

Usefull commands
~~~~~~~~~~~~~~~~

List all running containers:

.. code:: sh

    $ docker ps

Stop all running containers:

.. code:: sh

    $ docker-compose stop

Remove all docker volumes:

.. code:: sh

    $ docker-compose rm -v

Links :
~~~~~~~

-  Mockups :
   https://codeandbeers.mybalsamiq.com/projects/lesloupsgarousdewalstreet
-  Usercases :
   https://docs.google.com/drawings/d/16-iap\_nk58W5UpSBDGbq4DKDBP9h04uM0pH9CLmzx3Q/edit?ts=56e5996a

.. _Docker: https://docs.docker.com/engine/installation/linux/ubuntulinux/
.. _Docker-compose: https://docs.docker.com/compose/#compose-documentation
