import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './common/Loader';
import validate from '../helpers/validator';
import questionSchema from '../schema/questionSchema';
import { getSingleMeetup, getMeetupQuestions, rsvps } from './services/meetupService';
import { upVote, downVote } from './services/voteServices';
import { addQuestion } from './services/questionServices';
import exceptionHandler from '../helpers/exceptionHandler';
import Button from './common/Button';
import Input from './common/Input';

class SingleMeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetup: [], questions: [], loading: false, showQuestionForm: false, form: { title: '', body: '' },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { params } = this.props.match;
      const meetup = await getSingleMeetup(params.id);
      this.setState({ meetup: meetup[0] });
      const questions = await getMeetupQuestions(params.id);
      this.setState({ questions });
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const { form } = this.state;
    form[input.id] = input.value;
    this.setState({ form });
  };

  submitQuestionForm = async () => {
    this.setState({ loading: true });
    try {
      const { meetup, form, questions } = this.state;
      const questionData = { meetup: meetup.id, ...form };
      const data = await addQuestion(questionData);
      const question = [data[0], ...questions];
      this.setState({ questions: question, showQuestionForm: false });
      toast.success('Your question has been added');
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  };
  handleSaveQuestion = (e) => {
    e.preventDefault();
    const { form } = this.state
    const error = validate(form, questionSchema);
    if (error) return toast.error(error);
    return this.submitQuestionForm();
  };

  handleCancel = () => {
    this.setState({ showQuestionForm: false });
  };

  updateQuestions = (question) => {
    const { questions: currentQuestion } = this.state;
    const questions = currentQuestion.filter(x => x.id !== question.id);
    const updatedQuestions = [question, ...questions];
    this.setState({ questions: updatedQuestions });
  }

  upVote = async (id) => {
    this.setState({ loading: true });
    try {
      const question = await upVote(id);
      this.updateQuestions(question);
      toast.success('you have successfully up voted this question');
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  };

  downVote = async (id) => {
    this.setState({ loading: true });
    try {
      const question = await downVote(id);
      this.updateQuestions(question);
      toast.success('you have successfully down voted this question');
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  rsvpUser = async (id, response) => {
    this.setState({ loading: true });
    try {
      await rsvps(id, { response });
      toast.success(`you responded with ${response} to this meetup`);
    } catch (ex) {
      exceptionHandler(ex);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      meetup, loading, questions, showQuestionForm, form,
    } = this.state;
    const { length: questionLength } = questions;
    const { title, body } = form;

    return (
      <React.Fragment>
        {loading && <Loader />}
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
              <Button onClick={() => { this.setState({ showQuestionForm: true }); }} className="btn font12 sm" id="add-question" value="Ask Question" />
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
        {!showQuestionForm && (
        <div id="questions" className="flex full flex-buttom-space">
          {questions.length > 0 && (
            <div className="center no-border">
              <h1 id="title">Questions</h1>
            </div>
          )}
          {questions.map(question => (
            <div className="space" key={question.id}>
              <h4><Link to="/">{question.title}</Link></h4>
              <p className="font16">{question.body}</p>
              <span className="text-holder">
                <ul className="details">
                  <li>{new Date(question.createdon).toDateString()}</li>
                  <li>
                  <Link className="upvote" to={`/meetups/${meetup.id}`} onClick={() => { this.upVote(question.id); }}>
                    <i className="fas fa-thumbs-up" />
                    <span className="num" />
                    {question.upvotes}
                  </Link>
                  </li>
                  <li>
                    <Link className="downvote" to={`/meetups/${meetup.id}`} onClick={() => { this.downVote(question.id); }}>
                      <i className="fas fa-thumbs-down" />
                      <span className="num">{question.downvotes}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="comment" href="comment.html">
                      <i className="fas fa-comment" />
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
