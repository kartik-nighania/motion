import { useEffect, useMemo } from "react"
import { AnimationManager } from "../../animation"
import { AnimationControls } from "./use-animation-controls"
import { Poses } from "types"

const isAnimationManager = (animation: any): animation is AnimationManager => animation instanceof AnimationManager

export const useAnimationSubscription = (
    animation: AnimationManager | Poses | undefined,
    controls: AnimationControls
) => {
    const unsubscribe = useMemo(
        () => {
            if (isAnimationManager(animation)) {
                return animation.subscribe(controls)
            }
        },
        [animation]
    )

    useEffect(() => () => unsubscribe && unsubscribe(), [unsubscribe])
}

//useEffect(
//         () => {
//             animator.subscribe(controls)

//             if (inheritPose && parentControls) {
//                 parentControls.addChild(controls)
//             }

//             return () => {
//                 animator.unsubscribe(controls)

//                 if (inheritPose && parentControls) {
//                     parentControls.removeChild(controls)
//                 }
//             }
//         },
//         [inheritPose, animator]
//     )
