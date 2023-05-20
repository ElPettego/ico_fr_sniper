rabbitmq linux install 

echo "deb http://www.rabbitmq.com/debian/ testing main"  | sudo tee  /etc/apt/sources.list.d/rabbitmq.list > /dev/null
wget https://www.rabbitmq.com/rabbitmq-signing-key-public.asc
sudo apt-key add rabbitmq-signing-key-public.asc
sudo apt-get update
sudo apt-get install rabbitmq-server -y
sudo service rabbitmq-server start
sudo rabbitmq-plugins enable rabbitmq_management
sudo service rabbitmq-server restart

RABBIT MQ PORT: 15672

GETH INSTALL 

sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt update
sudo apt install geth

GETH SETUP
geth account new # SETTARE PASSWORD E PRENDERE API KEY # PASSWORD -> prova
geth --http --http.api personal,eth --http.corsdomain "*" --http.vhosts "*" --http.addr "localhost" --http.port 5551 --http.apikey "0xCb1bcE7C7F1C18aA18D29f0A705787D8426F5559"