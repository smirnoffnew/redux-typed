import React from "react";
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { Expense } from "../types/Expense";
import { AppState } from "../store/configureStore";
import { AppActions } from "../types/actions";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";

interface HomePageProps {
  id?: string;
  color?: string;
}

interface HomePageState {

}

type Props = HomePageProps & LinkDispatchProps & LinkStateProp; 
// this aggregation is to bundle both HomePageProps together with redux stuff 

export class HomePage extends React.Component<Props, HomePageState> {
  onEdit = (expense: Expense) => {
    this.props.startEditExpense(expense);
  };
  onRemove = (id: string) => {
    this.props.startRemoveExpense(id);
  };
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h1>Expense Page</h1>
        <div>
          {expenses.map(expense => (
            <div>
              <p>{expense.description}</p>
              <p>{expense.amount}</p>
              <p>{expense.note}</p>
              <button onClick={() => this.onRemove(expense.id)}>
                Remove Expense
              </button>
              <button onClick={() => this.onEdit(expense)}>Edit Expense</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  expenses: Expense[]
}
interface LinkDispatchProps {
  startEditExpense: (expense: Expense) => void;
  startRemoveExpense: (id: string) => void; 
}

const mapStateToProps = (state: AppState, ownProps: HomePageProps): LinkStateProp => ({
  expenses: state.expenses
  // e.g. auth_token: state.anyStore.anyFurtherIfneeded
  // e.g. id: ownProps.id
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomePageProps): LinkDispatchProps => ({
  // pre TS variant -   startEditExpense: expense => dispatch(startEditExpense(expense)),
  // pre TS variant -   startRemoveExpense: data => dispatch(startRemoveExpense(data))

  startEditExpense: bindActionCreators(startEditExpense, dispatch),
  startRemoveExpense: bindActionCreators(startRemoveExpense, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
