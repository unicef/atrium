FROM nodebb/docker
RUN npm install nodebb-plugin-session-sharing nodebb-plugin-mentions
CMD node app --setup  "{\"admin:username\":\"$ADMIN_USERNAME\",\"admin:password\":\"$ADMIN_PASSWORD\",\"admin:password:confirm\":\"$ADMIN_PASSWORD\",\"admin:email\":\"$ADMIN_EMAIL\"}" --defaultPlugins "[\"nodebb-plugin-session-sharing\", \"nodebb-plugin-mentions\"]" && ./nodebb start
