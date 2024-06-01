gcloud functions deploy cardDispenser \
--gen2 \
--runtime=nodejs20 \
--region=us-east1 \
--source=functions/cardDispenser \
--entry-point=giveCards \
--trigger-http