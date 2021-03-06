import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import validate from '../../../helpers/validator';
import questionSchema from '../../../schema/questionSchema';
import Button from '../../common/Button';
import Input from '../../common/Input';

class SingleMeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestionForm: false, form: { title: '', body: '' },
    };
  }

  async componentDidMount() {
    const { getMeetupQuestions, getSingleMeetup } = this.props;
    const { params } = this.props.match;
    const id = parseInt(params.id, 10);
    this.setState({ id });
    await getMeetupQuestions(id);
    await getSingleMeetup(id);
  }

  handleChange = ({ currentTarget: input }) => {
    const { form } = this.state;
    form[input.id] = input.value;
    this.setState({ form });
  };

  submitQuestionForm = async () => {
    const { id } = this.state;
    const { form } = this.state;
    const questionData = { meetup: id, ...form }
    const { addQuestion } = this.props;
    await addQuestion(questionData);
  };
  handleSaveQuestion = (e) => {
    e.preventDefault();
    const { form } = this.state
    const error = validate(form, questionSchema);
    if (error) return toast.error(error);
    return this.submitQuestionForm();
  };

  handleCancel = async () => {
    const { id } = this.state;
    const { getMeetupQuestions, getSingleMeetup } = this.props;
    await getMeetupQuestions(id);
    await getSingleMeetup(id);
    this.setState({ showQuestionForm: false });
  };

  upVote = async (id) => {
    const { upVoteQuestion } = this.props;
    await upVoteQuestion(id);
  };

  downVote = async (id) => {
      const { downVoteQuestion } = this.props;
      await downVoteQuestion(id);
  }

  rsvpUser = async (id, response) => {
    const { rsvps } = this.props;
    await rsvps(id, { response });
  }

  render() {
    const { showQuestionForm, form } = this.state;
    const { LoadingReducer, questions, meetups } = this.props;
    const { loader } =  LoadingReducer;
    const { singleMeetupData: meetup } = meetups;
    const { questionsData } = questions
    const { length: questionLength } = questionsData;
    const { title, body } = form;

    return (
      <React.Fragment>
        {loader && <Loader />}
        {meetup && (
          <div className="flex full no-pad">
          <div>
            <div>
              <img className="image-lg card-image" src={meetup.images} alt="meetupimage" />
            </div>
            <h4><Link className="topic" to={`/meetup/${meetup.id}`}>{meetup.topic}</Link></h4>
            <h6 className="font12">{`@${meetup.location}`}</h6>
            <span className="text-holder">
              <ul className="details font12">
                <li>{new Date(meetup.happeningon).toDateString()}</li>
                {questionLength > 1 && <li>{`${questionLength} Questions`}</li>}
                {questionLength <= 1 && <li>{`${questionLength} Question`}</li>}
              </ul>
              <Button onClick={() => { this.setState({ showQuestionForm: true }); }} className="btn font12 sm" id="ask-question" value="Ask Question" />
            </span>
            <h4>
              Are you going?
              <p>
                <Button className="btn font12 ssm yes" id="add-question" onClick={() => { this.rsvpUser(meetup.id, 'yes'); }} value="Yes" />
                <Button className="btn font12 ssm no" id="add-question" onClick={() => { this.rsvpUser(meetup.id, 'no'); }} value="No" />
                <Button className="btn font12 ssm maybe" id="add-question" onClick={() => { this.rsvpUser(meetup.id, 'maybe'); }} value="Maybe" />
              </p>
            </h4>
          </div>
        </div>
        )}
        {!showQuestionForm && (
        <div id="questions" className="flex full flex-buttom-space">
          {questionsData.length > 0 && (
            <div className="center no-border">
              <h1 id="title">Questions</h1>
            </div>
          )}
          {questionsData.map(question => (
            <div className="space" key={question.id}>
              <h4><Link to="/">{question.title}</Link></h4>
              <p className="font16">{question.body}</p>
              <span className="text-holder">
                <ul className="details">
                  <li>{new Date(question.createdon).toDateString()}</li>
                  <li>
                  <Link className="upvote" onClick={() => { this.upVote(question.id); }}>
                    <i className="fas fa-thumbs-up" />
                    <span className="num" />
                    {question.upvotes}
                  </Link>
                  </li>
                  <li>
                    <Link className="downvote" onClick={() => { this.downVote(question.id); }}>
                      <i className="fas fa-thumbs-down" />
                      <span className="num">{question.downvotes}</span>
                    </Link>
                  </li>
                </ul>
              </span>
            </div>
          ))}
        </div>
        )}
        {showQuestionForm && (
          <div className="container" id="add-question">
            <Input
              value={title}
              onChange={this.handleChange}
              type="text"
              id="title"
              autoFocus="autofocus"
              label="Title"
              placeholder="title"
              required="required"
            />
            <label htmlFor="title">Body</label>
            <textarea id="body" cols="54" rows="4" value={body} onChange={this.handleChange} />
            <div className="center">
              <Button className="btn font12 sm" id="btnsave" onClick={this.handleSaveQuestion} value="Save" />
              {' '}
              <Button className="btn font12 sm" id="btncancel" onClick={this.handleCancel} value="Cancel" />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SingleMeetup;
