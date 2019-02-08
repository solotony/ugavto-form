<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Example Component</div>

                    <div class="panel-body">
                        I'm an example component!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>


<div>
    <label>VIN {{ s_vin }}</label>
    <input type="text" v-validate="{ length:17 , regex:/^([0-9ABCDEFGHJKLMNPRSTUVWXYZ]{17})$/ }"
           v-model="s_vin" name="s_vin" palceholder="VIN"
           @input="s_vin = $event.target.value.toUpperCase()">
    <span>{{ errors.first('s_vin') }}</span>
</div>


<div class="form-input">
    <input type="text" name="qqqqqq" v-validate="'required|email'" placeholder="Email">
    <span v-show="errors.has('qqqqqq')">{{ errors.first('qqqqqq') }}</span>
    <span v-show="fields.qqqqqq && fields.email.dirty">I'm Dirty</span>
    <span v-show="fields.qqqqqq && fields.email.touched">I'm touched</span>
    <span v-show="fields.qqqqqq && fields.email.valid">I'm valid</span>
</div>


<div>
    <input v-model="xmail"  v-validate="'required|email'" name="xmail" type="text" id="xmail">
    <span v-show="errors.has('xmail')"><br>{{ errors.first('xmail') }}</span>
    <span v-show="fields.xmail && fields.xmail.dirty"><br>I'm Dirty</span>
    <span v-show="fields.xmail && fields.xmail.pristine"><br>I'm Pristine</span>
    <span v-show="fields.xmail && fields.xmail.touched"><br>I'm touched</span>
    <span v-show="fields.xmail && fields.xmail.valid"><br>I'm valid</span>
</div>
