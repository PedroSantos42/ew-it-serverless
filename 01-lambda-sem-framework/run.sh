# 1º criar arquivo de políticas de segurança

# 2º criar role de segurança da AWS
aws iam create-role \
    --role-name lambda-example \
    --assume-role-policy-document file://policies.json \
    | tee logs/role.log

# 3º criar arquivo com conteúdo e zipá-lo
zip function.zip index.js

aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role arn:aws:iam::253519823014:role/lambda-example \
    | tee logs/lambda-create.log

# 4º invoke lambda!
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log

# -- atualizar, zipar
zip function.zip index.js

# -- update lambda
aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log

# 5º invoke lambda and verify the results
aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec-update.log

# 6º remover recursos
aws lambda delete-function \
    --function-name hello-cl

aws iam delete-role \
    --role-name lambda-example