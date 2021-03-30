<template>
    <div class="login-page">
        <v-card class="form-box">
            <v-card-title>
                Login
            </v-card-title>
            <div class="form-content">
                <v-text-field 
                    placeholder="Username"
                    v-model="username"
                    dense></v-text-field>
                <v-text-field 
                    placeholder="Password"
                    v-model="password"
                    type="password"
                    dense></v-text-field>
                <p v-if="showError">{{errorText}}</p>
            </div>
            <v-card-actions>
                <v-btn 
                    @click.prevent="onSubmit"
                    class="submit-btn">submit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import moment from 'moment-timezone'
export default {
    data: () => ({
        username: '',
        password: '',
        showError: false,
        errorText: ''
    }),
    methods: {
        // onSubmit() {
        //     let data = {
        //         username: this.username,
        //         password: this.password,
        //     }
        //     this.$http.post('/login', data)
        //     .then(res => {
        //         console.log(res.data)
        //         localStorage.setItem('token', res.data.data.token)
        //         localStorage.setItem('user', JSON.stringify(res.data.data.user))
        //         this.$router.push('/lobby')
        //     })
        //     .catch(err => {
        //         let errorRes = err.response.data
        //         this.showError = true
        //         if(errorRes.code == 401) {
        //             this.errorText = errorRes.message
        //         } else {
        //             this.errorText = 'Server Error. Try again.'
        //         }
        //     })
        // },
        onSubmit() {
            // post request
            this.$store.dispatch('authentication/login', {
                // credentials
                data: {    
                    username: this.username.toLowerCase(),
                    password: this.password
                },
                // login success
                onSuccess: () => {
                    this.$router.push({ name: 'Lobby' })
                },
                // login fail
                onError: error => {
                    var server_message = null;
                    var slug = null 
                    this.showError = true

                    if (typeof error.response.data === 'object') {
                        server_message = error.response.data.message
                        slug = error.response.data.slug
                    }
                    else {
                        server_message = error.response.data
                    }

                    
                    if (slug == 'you_cannot_login_yet') {
                        const {gates} = this.$store.getters['settings/settings']
                        console.log(gates)
                        const restrictionDates = gates.find(data => data.type === 'login')

                        if (restrictionDates) {
                            var today = moment.utc()
                            var loginStart = moment.utc(restrictionDates.start_at, 'YYYY-MM-DD HH:mm:ss')
                            var loginEnd = moment.utc(restrictionDates.end_at, 'YYYY-MM-DD HH:mm:ss')

                            if (!today.isBetween(loginStart, loginEnd)) {
                                this.errorText = `You cannot enter yet. The event will start on ${loginStart.format('MMMM D, YYYY')} at ${loginStart.format('hh:mm a')} UTC(+8)`
                            }
                            else
                                this.errorText = server_message
                        }
                    }
                    else if (slug == 'user_not_found') {
                        this.errorText = "User doesn't exist"
                    }
                    else if (slug == 'please_login_with_a_password') {
                        this.errorText = "Please login with a password"
                    }
                    else {
                        this.errorText = server_message
                    }
                },
                // login done
                onDone: () => this.loading = false
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(255,255,255);
    background: -moz-linear-gradient(81deg, rgba(255,255,255,1) 0%, rgba(0,70,142,1) 73%);
    background: -webkit-linear-gradient(81deg, rgba(255,255,255,1) 0%, rgba(0,70,142,1) 73%);
    background: linear-gradient(81deg, rgba(255,255,255,1) 0%, rgba(0,70,142,1) 73%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#00468e",GradientType=1);

    .form-box {
        width: 500px;
        padding: 15px 30px;
    }

    .form-content {
        padding: 16px;

        ::v-deep .v-text-field {
            margin-bottom: 15px;
        }
    }

    .submit-btn {
        background-color: #00468e !important;
        color: white !important;
        width: 100% !important;
        font-size: 16px;
    }
}
</style>