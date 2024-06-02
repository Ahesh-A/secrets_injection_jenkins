CONTAINER_PORT_INT=$((CONTAINER_PORT))
TARGET_PORT_INT=$((TARGET_PORT))
K8SPORT_INT=$((K8SPORT))

sed -e "s/\$CONTAINER_PORT/$CONTAINER_PORT_INT/" \
    -e "s/\$TARGET_PORT/$TARGET_PORT_INT/" \
    -e "s/\$K8SPORT/$K8SPORT_INT/"  deployment.yaml | kubectl --kubeconfig $KUBECONFIG apply -f -