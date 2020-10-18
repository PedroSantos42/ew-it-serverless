# 1º instalar SLS
npm i -g serverless

# 2º inicializar projeto SLS 
sls

# 3º deploy (sempre que alterar)
sls deploy -v | tee logs/lambda-deploy.log

# 4º invoke lambda AWS / local
sls invoke -f hello
sls invoke local -f hello -l

# 5º configurar dashboard
sls

# 6º  logs
sls logs -f hello -t 
# sls logs -f hello --tail
