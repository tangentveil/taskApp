## taskApp
## [Deployed Website](https://taskapp-client.onrender.com/)

## How to Run Locally

1. Download the Code or clone it.
2. Open the folder with vs code.
3. Go to the Client->src->api->index.js file, where you will find baseURL, uncomment the localhost URL, and comment on the backend-hosted URL.

   ![image](https://github.com/tangentveil/taskApp/assets/59107332/fa17a686-0782-4e33-a339-3db69dcec00a)

5. Open the Split Terminal.
   
   ![image](https://github.com/tangentveil/taskApp/assets/59107332/18f06139-3cfb-45d6-8971-9cfd2f6b5b8c)
   
6. Run the following commands in both terminals.

   ![image](https://github.com/tangentveil/taskApp/assets/59107332/b9fcec7e-cda9-409b-b895-d7957eba24e8)


```
cd server
npm install
node index.js
```

```
cd client
npm install
npm run dev
```

6. Open the Link from the client terminal.

![image](https://github.com/tangentveil/taskApp/assets/59107332/c2464abd-a94c-4775-a8ba-9f6e34fcb2dd)