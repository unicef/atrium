FROM nodebb/docker
RUN npm install nodebb-plugin-session-sharing nodebb-plugin-mentions
COPY config.json .
CMD node app --setup  "{\"admin:username\":\"admin\",\"admin:password\":\"password123!\",\"admin:password:confirm\":\"password123!\",\"admin:email\":\"test@unicef.com\"}" --defaultPlugins "[\"nodebb-plugin-session-sharing\", \"nodebb-plugin-mentions\"]" && ./nodebb start
