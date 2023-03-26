# How to run with kubernetes
<br/>
minikube start
<br/>
alias kubectl="minikube kubectl --"
<br/>
eval $(minikube -p minikube docker-env)
<br/>
docker-compose build
<br/>
kubectl apply -f backend-deployment.yaml,backend-service.yaml,frontend-deployment.yaml,frontend-service.yaml,postgres-data-persistentvolumeclaim.yaml,postgres-todoapp-deployment.yaml,postgres-todoapp-service.yaml,todoapp-network-networkpolicy.yaml
<br/>
minikube ip
<br/>
from inside ubuntu: 
http://<minikube-ip>:30001
<br/>
kubectl delete -f backend-deployment.yaml,backend-service.yaml,frontend-deployment.yaml,frontend-service.yaml,postgres-data-persistentvolumeclaim.yaml,postgres-todoapp-deployment.yaml,postgres-todoapp-service.yaml,todoapp-network-networkpolicy.yaml
<br/>
minikube stop
