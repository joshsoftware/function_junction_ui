import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd'

export class ShowTeam extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        }
    }
    toggleEditing = () => {
        this.setState((state) => {
            return {
                isEditing: !state.isEditing,
            }
        });
    }
    handleNameChange = (event) => {
        event.preventDefault();
        console.log('Value:', event.target.value);
        this.toggleEditing();
        this.props.handleNameChange(event.target.value);
    }
    handleShowcasableURLChange = (event) => {
        event.preventDefault();
        console.log('URL Value:', event.target.value);
        this.toggleEditing();
        this.props.handleShowcasableURLChange(event.target.value);
    }
    render() { 
        const { isEditing } = this.state;
        const { team, isShowcasable } = this.props;
        return (
            <>
                {
                    !isEditing ?
                    <>
                        <div className='flex-center'>
                            <h4 className='team-name'>{/* <Icon type="usergroup-add" /> */}{team.name}</h4>
                            <h4><Icon onClick={this.toggleEditing}  type="edit" /></h4>
                        </div>
                        <div className='showcasable-url'>
                            <a target='_blank' rel="noopener noreferrer" href={`${team.showcasable_url}`}>{team.showcasable_url}</a>
                        </div>
                        </>
                    :
                        <>
                        <Input
                            defaultValue={team.name}
                            onBlur={this.handleNameChange}
                            placeholder='Enter team name'
                        />
                        <Input
                            className='showcasable-url'
                            placeholder="Enter showcaseable URL"
                            defaultValue={team.showcasable_url}
                            onBlur={this.handleShowcasableURLChange}
                        />
                        </>

                }
            </>
        );
    }
}
