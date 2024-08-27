sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("com.app.rfscreens.controller.Home", {
            onInit: function () {

            },
            /**Loading Signup Fragment */
            onPressSignupBtn: async function () {
                this.oSignupForm ??= await this.loadFragment({
                    name: "com.app.rfscreens.fragments.SignUpDetails"
                })
                this.oSignupForm.open();
            },
            /**Close Signup Form */
            onCloseRegisterSubmitDialog: function () {
                this.oSignupForm.close();
                this.onClearRegisterSubmitDialog();
            },
            /**Clearing Values in the form */
            onClearRegisterSubmitDialog: function () {
                var oView = this.getView();

                // Clear the value of each input field
                oView.byId("idPhoneNumberInput").setValue("");
                oView.byId("idCreatePasswordInput").setValue("");
                oView.byId("idInputuserType").setValue("");
                oView.byId("idInputuserType8").setValue("");

                // Clear the value of each ComboBox
                oView.byId("_IDGenComboBox1").setSelectedKey("");
                oView.byId("_IDGenComboBox2").setSelectedKey("");
                oView.byId("_IDGenComboBox3").setSelectedKey("");
            },
            /**Based on Selected key DropDown Should be visible */
            onSelect: function (oEvent) {
                var oArea = oEvent.getSource().getSelectedKey();
                if (oArea === 'Inbound') {
                    this.byId("_IDGenComboBox2").setVisible(true);
                    this.byId("_IDGenComboBox3").setVisible(false);
                    this.byId("_IDGenComboBox4").setVisible(false);
                    this.byId("_IDGenComboBox5").setVisible(false);

                } else if (oArea === 'Outbound') {
                    this.byId("_IDGenComboBox2").setVisible(false);
                    this.byId("_IDGenComboBox3").setVisible(true);
                    this.byId("_IDGenComboBox4").setVisible(false);
                    this.byId("_IDGenComboBox5").setVisible(false);

                } else if (oArea === 'Internal') {
                    this.byId("_IDGenComboBox2").setVisible(false);
                    this.byId("_IDGenComboBox3").setVisible(false);
                    this.byId("_IDGenComboBox4").setVisible(true);
                    this.byId("_IDGenComboBox5").setVisible(false);
                } else {
                    this.byId("_IDGenComboBox2").setVisible(false);
                    this.byId("_IDGenComboBox3").setVisible(false);
                    this.byId("_IDGenComboBox4").setVisible(false);
                    this.byId("_IDGenComboBox5").setVisible(true);
                }
            },
            /**Getting Signup form Details*/
            onSubmitPress: function () {
                 
                var oArea = this.byId("_IDGenComboBox1").getSelectedKey();
                /**here OArea may be inbound,outbound or Internal based on OArea we get the values */
                var oItem;
                if (oArea === 'Inbound') {
                    oItem = this.byId("_IDGenComboBox2").getSelectedKey();
                } else if (oArea === 'Outbound') {
                    oItem = this.byId("_IDGenComboBox3").getSelectedKey();
                } else {
                    oItem = this.byId("_IDGenComboBox4").getSelectedKey();
                }

                var oResource = this.byId("idPhoneNumberInput").getValue();
                var oUsername = this.byId("idCreatePasswordInput").getValue();
                var oEmail = this.byId("idInputuserType").getValue();
                var oPhone = this.byId("idInputuserType8").getValue();
                /**generating Password */
                function generatePassword() {
                    const regex = /[A-Za-z@!#$%&]/;
                    const passwordLength = 8;
                    let password = "";

                    for (let i = 0; i < passwordLength; i++) {
                        let char = '';
                        while (!char.match(regex)) {
                            char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                        }
                        password += char;
                    }

                    return password;
                }
                var oPassword = generatePassword();

                var oModel = this.getView().getModel();
                var that = this;
                oModel.create("/RESOURCESSet", { Resourceid: oResource, Validity: false, Resourcename: oUsername, Area: oArea, Email: oEmail, Phonenumber: oPhone, Password: oPassword ,Resourcegroup:oItem}, {
                    success: function (oData) {
                        sap.m.MessageToast.show("suceess");
                            that.onCloseRegisterSubmitDialog();
                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                    }
                })

            }
        });
    });
