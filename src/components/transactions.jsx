import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addTransaction, clearStore, modifyTransaction, clearModification } from '../store/actions';
import ReturnedTransactions from './returnedTrx';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

const memo = {
    'multiline': true,
};

const styles = {
    trx: {
        margin: "30px 10px 10px 10px"
    },
    form: {
        marginBottom: "25px",
        width: "100%"
    },
    input: {
        marginBottom: '20px'
    }
};

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            date: "",
            amount: "",
            memo: "",
            pointer: "",
            modifyIndex: ""
        };

    };

    addNewTransaction = (e) => {
        e.preventDefault();
        if (this.props.modifyIndex !== "") {
            this.props.modifyTransaction({
                name: this.state.name,
                date: this.state.date,
                amount: this.state.amount,
                memo: this.state.memo,
                pointer: this.state.pointer
            });
        } else {
            this.props.addTransaction([{
                name: this.state.name,
                date: this.state.date,
                amount: this.state.amount,
                memo: this.state.memo
            }]);
        }
        this.setState({
            modifyIndex: ""
        });
        this.clearScreen();
    };

    handleChange = (e, details) => {
        switch (details) {
            case 'date':
                this.setState({
                    date: e.target.value
                });
                break;
            case 'name':
                this.setState({
                    name: e.target.value
                });
                break;
            case 'amount':
                this.setState({
                    amount: e.target.value
                });
                break;
            case 'memo':
                this.setState({
                    memo: e.target.value
                });
                break;
            default:

                break;
        }
    }

    clearScreen = () => {
        this.props.clearModification();
        this.setState({
            name: "",
            date: "",
            amount: "",
            memo: "",
            pointer: "",
            modifyIndex: ""
        });
    }

    clearStore = () => {
        this.props.clearStore();
    };

    static getDerivedStateFromProps(props, state) {
            if ((props.modifyIndex !== state.modifyIndex) && props.modifyIndex !== "") {
                const { name, date, memo, amount, pointer } = props.modifyArr[0];
                return {
                    name: name,
                    date: date,
                    memo: memo,
                    amount: amount,
                    pointer: pointer,
                    modifyIndex: props.modifyIndex
                }
            }
            
        return null;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Box
                    className={clsx(classes.trx)}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    flexDirection="column"
                >
                    <form id="transactionForm" onSubmit={this.addNewTransaction} className={clsx(classes.form)}>
                        <TextField
                            id="date"
                            label="Transaction Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.state.date}
                            onChange={(e) => this.handleChange(e, 'date')}
                            className={clsx(classes.input)}
                            fullWidth
                            variant="filled"
                        />
                        <div>
                            <TextField
                                name="name"
                                placeholder="Payee Name"
                                type="text"
                                required
                                value={this.state.name}
                                onChange={(e) => this.handleChange(e, 'name')}
                                className={clsx(classes.input)}
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircle />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                        </div>
                        <div>
                            <TextField
                                name="amount"
                                placeholder="Amount"
                                value={this.state.amount}
                                type="number"
                                onChange={(e) => this.handleChange(e, 'amount')}
                                className={clsx(classes.input)}
                                fullWidth
                                variant="filled"
                            />
                        </div>
                        <div>
                            <TextField
                                name="memo"
                                placeholder="Memo"
                                type="text"
                                InputProps={memo}
                                value={this.state.memo}
                                onChange={(e) => this.handleChange(e, 'memo')}
                                className={clsx(classes.input)}
                                fullWidth
                                multiline
                                variant="filled"
                            />
                        </div>
                        <div>
                            <Button type="submit" color="primary">
                                {this.state.modifyIndex === "" ? 'Add' : 'Modify'}
                            </Button >
                            <Button onClick={this.clearScreen} color="primary">
                                Clear
                        </Button >

                        </div>
                    </form>
                    {/* <Button onClick={this.clearStore} variant="contained" color="primary">
                        Clear Store
                </Button > */}
                </Box>
                <ReturnedTransactions />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTransaction: transaction => dispatch(addTransaction(transaction)),
        clearStore: () => dispatch(clearStore()),
        modifyTransaction: transaction => dispatch(modifyTransaction(transaction)),
        clearModification: () => dispatch(clearModification())
    };
}

const mapStateToProps = (state) => {
    return {
        modifyObj: state.modifierObject,
        modifyArr: state.modifierObject.modifierArray,
        modifyIndex: state.modifierObject.modifierIndex
    };
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Transactions);