import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {useScreenContext} from '../../Contexts/ScreenContext';
import {ColorPalette} from '../../Assets/Themes/ColorPalette';
import {StaticVariables} from '../../Preferences/StaticVariables';
import {CommentItemType, UpdatingCommentDetailsType} from '../../types/types';
import styles from './Style';

type CommentCardPropsType = {
  item: CommentItemType;
  handleDeleteComment: (id: number) => Promise<void>;
  handleUpdateComment: (
    updatingCommentDetails: UpdatingCommentDetailsType,
  ) => Promise<void>;
};

const CommentCard: React.FC<CommentCardPropsType> = ({
  item,
  handleDeleteComment,
  handleUpdateComment,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatingMessageDetails, setUpdatingMessageDetails] =
    useState<UpdatingCommentDetailsType>({
      id: undefined,
      editedBody: StaticVariables.EMPTY_STRING,
    });

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseButton = () => {
    closeModal();
    setTimeout(() => {
      setIsEditing(false);
    }, 300);
  };
  const handleEditbutton = async (id: number) => {
    setUpdatingMessageDetails({id, editedBody: item.body});
    setIsEditing(true);
  };
  const handelSaveEditing = async () => {
    await handleUpdateComment(updatingMessageDetails);
    closeModal();
  };
  const handleCancelEditing = () => {
    setUpdatingMessageDetails({
      id: 0,
      editedBody: StaticVariables.EMPTY_STRING,
    });
    setIsEditing(false);
  };
  const handleDelete = async (id: number) => {
    await handleDeleteComment(id);
    closeModal();
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={screenStyles.commentCard}>
      <TouchableOpacity onPress={() => openModal()}>
        <Text style={screenStyles.commentTitle}>{item.user.username}</Text>
        <Text>{item.body}</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={handleCloseButton}>
        <View style={screenStyles.modalFullScreenBackground}>
          <View style={[screenStyles.modalCommentContainer]}>
            <TouchableOpacity
              style={screenStyles.closeButton}
              onPress={handleCloseButton}>
              <FontAwesome name="close" size={25} />
            </TouchableOpacity>
            <Text style={screenStyles.commentTitle}>{item.user.username}</Text>
            {!isEditing ? (
              <Text>{item.body}</Text>
            ) : (
              <TextInput
                value={updatingMessageDetails.editedBody}
                onChangeText={e =>
                  setUpdatingMessageDetails({
                    ...updatingMessageDetails,
                    editedBody: e,
                  })
                }
                mode="outlined"
                multiline
                numberOfLines={3}
                selectionColor={ColorPalette.lightOrange}
                underlineColor={ColorPalette.lightOrange}
                activeUnderlineColor={ColorPalette.lightOrange}
                outlineColor={ColorPalette.lightOrange}
                activeOutlineColor={ColorPalette.lightOrange}
              />
            )}
            {!isEditing ? (
              <View style={screenStyles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => handleEditbutton(item.id)}
                  style={screenStyles.editButton}>
                  <Text style={screenStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={screenStyles.deleteButton}>
                  <Text style={screenStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={screenStyles.buttonsContainer}>
                <TouchableOpacity
                  onPress={handelSaveEditing}
                  style={screenStyles.editButton}>
                  <Text style={screenStyles.editButtonText}>save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEditing}
                  style={screenStyles.deleteButton}>
                  <Text style={screenStyles.deleteButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(CommentCard);
