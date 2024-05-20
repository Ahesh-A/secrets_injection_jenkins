sed -e "s/\$CONTAINER_PORT/$CONTAINER_PORT/" \
    -e "s/\$TARGET_PORT/$TARGET_PORT/" \
    -e "s/\$K8SPORT/$K8SPORT/"  deployment.yaml | kubectl apply -f -