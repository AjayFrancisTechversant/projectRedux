import {View, Text, VirtualizedList, ActivityIndicator} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import CommentCard from '../CommentCard';
import styles from './Style';

const CommentsContainer = ({
  loading,
  comments,
  handleDeleteComment,
  handleUpdateComment,
}) => {
  const emptyComponent = () => {
    return (
      <View style={screenStyles.emptyComponentContainer}>
        <Text style={screenStyles.emptyComponentText}> No comments :(</Text>
      </View>
    );
  };

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext,
    screenContext[screenContext.isPortrait ? 'windowWidth' : 'windowHeight'],
    screenContext[screenContext.isPortrait ? 'windowHeight' : 'windowWidth'],
  );
  return (
    <View style={[screenStyles.commentsContainer]}>
      {!loading ? (
        <VirtualizedList
          data={comments}
          refreshing={loading}
          getItemCount={data => data.length}
          getItem={(data, index) => data[index]}
          renderItem={({item}) => (
            <CommentCard
              item={item}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}></CommentCard>
          )}
          ListEmptyComponent={emptyComponent}
          ListHeaderComponent={<View style={screenStyles.separator}></View>}
          ListFooterComponent={<View style={screenStyles.separator}></View>}
          keyExtractor={item => Math.random().toString(36).substring(2)}
          initialNumToRender={10}
          persistentScrollbar
          maxToRenderPerBatch={20}
          windowSize={11}
          updateCellsBatchingPeriod={100}
          removeClippedSubviews={true}
        />
      ) : (
        <View style={screenStyles.loadingContainer}>
          <ActivityIndicator size={50} color={ColorPalette.white} />
        </View>
      )}
    </View>
  );
};

export default React.memo(CommentsContainer);
