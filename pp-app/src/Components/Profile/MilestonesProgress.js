import React, {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/auth.service";
import ImageService from "../../services/images.service";

const MileStoneModal = (props) =>{
    function closeModal() {
        props.onCloseModal();
    }
    return(
        <>
          <div key={props.id + " " + props.title} className="darkGreyBg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl p-10">

              <div className="space-y-4 md:space-y-9 px-6 md:px-8 lg:px-12 py-6 rounded-md relative flex flex-col w-auto bg-white outline-none focus:outline-none">
                <button className="w-full text-end font-Pop-B" onClick={closeModal}>X</button>             
                <div className="pb-4 md:pb-8 flex flex-col justify-center items-center space-y-4">
                    <div className="flex flex-col space-y-2">
                        <img
                            className="object-cover h-32 w-32 rounded "
                            src={props.image}
                            alt="MilestoneImage"
                        />
                        <div className="font-Pop-M uppercase text-xs text-center greenBg text-white rounded-xl p-1">Meta alcanzada</div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="mb-1 text-lg md:text-xl font-Pop-M text-gray-900 text-center blackText"> {props.title} </div>
                        <div className="text-center font-Pop-L text-xs md:text-sm px-4 md:px-8 lg:px-14">{props.description}</div>
                        <div className="block mb-2 text-xs font-Pop-L leading-none text-gray-500 text-center">Ganado el {props.createdAt.split('T')[0]}.</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

const MilestonesBox = (props) => {
    const [modal, setModal] = React.useState(false);
    const [icon, setIcon]= React.useState('')
    useEffect(() => {
        setIcon(ImageService.convertBinaryImageToUsableImage(props.icon))
    }, [props.icon]); 
    return (
      <>  
        {modal ?
            <MileStoneModal 
                onCloseModal={()=>setModal(false)}
                image={icon}
                title={props.title}
                description={props.description}
                createdAt={props.createdAt}/>
            : null}               
            <li className="mb-10 ml-7 md:ml-8 lg:ml-10 bg-white" key={props.id}>
            <span className="flex absolute -left-4 justify-center items-center w-8 h-8 bg-blue-200 rounded-full ring-8 ring-[#f6f7f36b] greenBg">
                <FontAwesomeIcon icon={faHeartPulse} className="h-4 w-4" color="white"/>
            </span>
            <div className="flex flex-row space-x-4 border border-gray-200 rounded-xl px-2 md:px-5 py-4">
                <img
                    className="object-cover h-20 w-20 rounded "
                    src={icon}
                    alt="MilestoneImage"
                />
                <div className="flex flex-col justify-center space-y-2">
                    <h3 className="mb-1 text-sm tracking-widest font-Pop-R text-gray-900"> Has alcanzado un hito <span onClick={()=>setModal(true)} className="duration-1000 hover:underline focus:underline underline-offset-2">{props.title}</span></h3>
                    <div className="block mb-2 tracking-wider text-xs font-Pop-L leading-none text-gray-400">Ganado el {props.createdAt.split('T')[0]}.</div>
                </div>
            </div>
        </li>   
      </>
    );
  };

const MilestonesProgress = () => {
  const [milestones, setMilestones] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    AuthService.getUserMilestones(currentUser.id).then(resp=> {setMilestones(resp.data.milestones)});
  }, [currentUser.id]);
  return (
    <>
    <div className="py-10 lg:py-6">
        <ol className="relative border-l border-[#0f693893]">
            {
            (milestones) ?
            milestones.map((milestone) => (
                <>
                <MilestonesBox
                id={milestone.id}
                title={milestone.title}
                description={milestone.description}
                createdAt={milestone.createdAt}
                icon={milestone.icon}
                />
                </>
            ))
          :null}                  
        </ol>
    </div>
    </>
  );
};
export default MilestonesProgress;