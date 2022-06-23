import axios from "axios";

const auth_adm = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbmlzdHJhdG9yIiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yQGFkbWluaXN0cmF0b3IuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1NDgwMTczNn0.r7OhJ4sc48iMJqSfUBO4c-Hqic2U2uNzDOxHTps9h74'

const ret = new Array();
for (let count = 0; count < 20; count++) {   
    const user = {
        username: `mock_user_${count}`,
        email: `mock_user_${count}@mocking.com`,
        password: "123",
        confirm_password: "123"
    }
    
    ret.push(axios.post(
        'http://localhost:8080/user/create',
        user,
        ).catch(e => {
            console.log(e)
        }))
    }
    
    const token = new Array();
    
    for (let i of ret) {
        token.push((await i).data.auth_token);
    }
    
    
    
    
    const tag_mock_call = new Array();
    for (let count = 0; count < 25; count++) {   
        const config = {
            headers: { auth_token: auth_adm }
        };
        const tag = {
            name: `tag_mock_${count}`,
            description: `tag_mock_${count} test description`
        }
        
        tag_mock_call.push(
            axios.post(
                'http://localhost:8080/tag/create',
                tag,
                config
                ).catch(e => {
                    console.log(e)
                }))
            }
            
            
            const tag_mock_resolve = new Array();
            for (let i of tag_mock_call) {
                const id = (await i).data.id
                console.log(id)
                tag_mock_resolve.push(id)
            }
            
            const values = new Array();
            for(let tk of token) {
                for (let tagValueListId = 59883; tagValueListId < 59883 + 5; tagValueListId++) {
                    for(let tag of tag_mock_resolve) {
                        values.push(await callTagValue(tagValueListId, tag, tk))    
                    }
                }
            }
            
            for (let i of values) {
                console.log(i.data)
                
            }
            
            async function callTagValue(tagValueListId, tagId, tk) {

                const config = {
                    headers: { auth_token: tk }
                };

                console.log({
                    tagValueListId: tagValueListId,
                    tag: tagId,
                    value: (Math.floor(Math.random() * 3) + 1)
                })
                const i = await axios.post(
                    'http://localhost:8080/tagValue/add',
                    {
                        tagValueListId: tagValueListId,
                        tag: tagId,
                        value: (Math.floor(Math.random() * 3) + 1)
                    },
                    config
                    ).catch(e => {
                        console.log(e);
                    })

                return i;
                }