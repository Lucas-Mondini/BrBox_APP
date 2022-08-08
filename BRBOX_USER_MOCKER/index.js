import axios from "axios";

const auth_adm = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yQGFkbWluaXN0cmF0b3IuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1OTM5NjIyMn0.rlKD9gX_gBTSXleZueKictrhWsq2JMd4Xlr3eVB8els'

const ret = new Array();
for (let count = 0; count < 20; count++) {   
    const user = {
        username: `mock_user_${count}`,
        email: `mock_user_${count}@mocking.com`,
        password: "123",
        confirm_password: "123"
    }
    
    ret.push( await axios.post(
        'http://localhost:8080/user/create',
        user,
        ).catch(e => {
            console.log(e)
        }))
    }
    
    const token = new Array();
    
    for (let i of ret) {
        token.push(i.data.auth_token);
    }
    
    
    
    
    const tag_mock_call = new Array();
    for (let count = 0; count < 25; count++) {   
        const config = {
            headers: { auth_token: auth_adm }
        };
        const tag = {
            name: `tag_mock_${count}`,
            description_positive: `tag_mock_${count} test description`,
            description_neutral: `tag_mock_${count} test description`,
            description_negative: `tag_mock_${count} test description`,
            icon: 1
        }
        
        tag_mock_call.push( await
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
                const id = i.data.id
                console.log(id)
                tag_mock_resolve.push(id)
            }
            
            const values = new Array();
            for(let tk of token) {
                for (let tagValueListId = 1; tagValueListId < 1 + 6; tagValueListId++) {
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